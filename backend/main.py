from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from sqlalchemy.orm import Session,aliased
from models import Service
import schemas
from sqlalchemy import select
import mysql.connector
from typing import List
from datetime import datetime
from datetime import time, timedelta
import pymysql

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

conn = mysql.connector.connect(
            user = "cantaonline",
            password = "Q1w2e3r44*",
            host = "162.241.103.240",
            database = "remesafe_remesas")
cursor = conn.cursor(buffered = True, dictionary=True)


@app.get("/")
async def root(db: Session = Depends(get_db)):
    cursor.execute(f'''select 
                            sp.id as value, 
                            sp.name as title,
                            spe.price as price,
                            sp.duration_in_min as duration
                        from store_products sp
                        join store_product_entry spe on spe.product_id = sp.id 
                        where sp.active = 1
                            and sp.type = "SERVICIO"
                   
                            and sp.company = 19 ''')
    services = cursor.fetchall()
    for i,service in enumerate(services):
        cursor.execute(f'''select se.id as value, se.name as title, ses.service_id as service from store_employee_service ses
                            join store_employees se on se.id = ses.employee_id 
                            where ses.service_id={service["value"]}''')
        employees = cursor.fetchall()
        services[i]["professional"] = employees
    
    return services

@app.post("/availible_dates")
def get_dates(data: schemas.getDatesBody):
    try:
        minutes = 30
        loop = int(60 / minutes)
        date = data.date if data.date != "" and data.date is not None else datetime.today().strftime('%Y-%m-%d')
        
        date = datetime.fromisoformat(date).strftime("%Y-%m-%d")
        services = data.services


        for index, service in enumerate(services):
            hours = [time((10 + i),minutes * x).strftime('%H:%M') for i in range(0,10) for x in range(loop)]
            hours.sort()
            employee = service.professional[0].value
            duration = service.duration / minutes

            cursor.execute(f'''select booked_for, finished_by , employee from store_bookings where DATE(booked_for) ="{date}" and status="BOOKED" and employee={employee} ORDER BY booked_for ASC''')
            bookings = cursor.fetchall()
            for booking in bookings:
                i = 0
                while(i < 10):
                    x = booking["booked_for"] + timedelta(minutes=minutes) * i
                    if x == booking["finished_by"]:
                        break
                    v = x.strftime("%H:%M")
                    try:
                        hours.remove(v)
                    except:
                        pass
                    i += 1
            
    
            
            count = 0
            while(count < len(hours)):
                hour = hours[count]
                remove = False
                for i in range(1, int(duration)):
                    x = (datetime.strptime(hour, "%H:%M") + timedelta(minutes=minutes) * i).strftime("%H:%M")
                    try:
                        hours.index(x)
                    except:
                        remove = True
                if remove:
                    hours.pop(hours.index(hour))
                else:
                    count += 1
            services[index].availibility = hours

        x = int(sum(c.duration for c in services) / minutes)
        
        final_hours = []
        for i,service in enumerate(services):
            times = service.availibility
            duration = service.duration
            for hour in times:
                insert = True
                finish_time = (datetime.strptime(hour, "%H:%M") + timedelta(minutes=duration)).strftime("%H:%M")
                for i2,service2 in enumerate(services):
                    if i == i2:
                        continue
                    try:
                        service2.availibility.index(finish_time)
                        duration2 = service2.duration
                        finish_time = (datetime.strptime(finish_time, "%H:%M") + timedelta(minutes=duration2)).strftime("%H:%M")
                        continue
                    except:
                        insert = False
                if insert and hour not in final_hours:
                    final_hours.append(hour)
        
        
        final_times = {
            "morning": [x for x in final_hours if "10" in x or "11" in x],
            "afternoon": [x for x in final_hours if "12" in x or "13" in x or "14" in x or "15" in x or "16" in x],
            "evening": [x for x in final_hours if "17" in x or "18" in x or "19" in x]
        }
        return {"date" : date, "times" : final_times}
    except ZeroDivisionError:
        raise HTTPException(status_code=500)

