from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

url = f'mysql://cantaonline:Q1w2e3r44*@162.241.103.240/remesafe_remesas'

engine = create_engine(
    url
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()