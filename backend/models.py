from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship

from database import Base


class Service(Base):
    __tablename__ = "store_products"
    id = Column(Integer, primary_key=True)
    company = Column(Integer)
    name = Column(String)
    active = Column(String)
    type = Column(String)
    professional = Column(JSON)

class Professional(Base):
    __tablename__ = "store_employees"
    id = Column(Integer, primary_key=True)
    company = Column(Integer)
    name = Column(String)
    active = Column(String)