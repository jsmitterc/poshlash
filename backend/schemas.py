from pydantic import BaseModel
from typing import List, Optional



class Professional(BaseModel):
    value: int
    title: str
    service: int

class Service(BaseModel):
    value: int
    title: str
    duration: int
    price: int
    professional: List[Professional]
    availibility: Optional[List[str]] = None

class getDatesBody(BaseModel):
    services: List[Service]
    date: Optional[str] = None