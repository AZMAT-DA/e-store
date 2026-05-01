from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, crud
from database import SessionLocal, engine, get_db
from fastapi.middleware.cors import CORSMiddleware

# Create tables (for simplicity in this example, use Alembic for production)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SoleStride API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to SoleStride API"}

@app.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.get("/categories", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories

@app.post("/categories", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db=db, category=category)

@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)

@app.get("/seed")
def seed_data(db: Session = Depends(get_db)):
    # Simple seed data
    if not crud.get_categories(db):
        cat1 = crud.create_category(db, schemas.CategoryCreate(name="Sneakers", description="High-performance sneakers"))
        cat2 = crud.create_category(db, schemas.CategoryCreate(name="Formal", description="Elegant formal shoes"))
        
        crud.create_product(db, schemas.ProductCreate(
            name="SoleStride Air-Glow",
            description="Ultra-lightweight sneakers with neon accents.",
            price=129.99,
            image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            stock=50,
            category_id=cat1.id
        ))
        crud.create_product(db, schemas.ProductCreate(
            name="Classic Onyx Oxford",
            description="Premium leather formal shoes for business and events.",
            price=189.99,
            image_url="https://images.unsplash.com/photo-1549298916-b41d501d3772",
            stock=30,
            category_id=cat2.id
        ))
    return {"message": "Seed data created"}
