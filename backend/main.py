from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='SoleStride API')

app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def root():
    return {'message': 'SoleStride API is running'}

@app.get('/seed')
def seed_database(db: Session = Depends(get_db)):
    return crud.seed_products(db)

@app.get('/products')
def get_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@app.get('/products/{product_id}')
def get_product(product_id: int, db: Session = Depends(get_db)):
    p = crud.get_product(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail='Not found')
    return p

@app.post('/products')
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@app.put('/products/{product_id}')
def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    u = crud.update_product(db, product_id, product)
    if not u:
        raise HTTPException(status_code=404, detail='Not found')
    return u

@app.delete('/products/{product_id}')
def delete_product(product_id: int, db: Session = Depends(get_db)):
    d = crud.delete_product(db, product_id)
    if not d:
        raise HTTPException(status_code=404, detail='Not found')
    return {'message': 'Deleted'}

@app.get('/cart/{session_id}')
def get_cart(session_id: str, db: Session = Depends(get_db)):
    return crud.get_cart(db, session_id)

@app.post('/cart/{session_id}/add')
def add_to_cart(session_id: str, item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    return crud.add_to_cart(db, session_id, item)

@app.put('/cart/{session_id}/update/{item_id}')
def update_cart_item(session_id: str, item_id: int, qty: schemas.CartItemUpdate, db: Session = Depends(get_db)):
    return crud.update_cart_item(db, session_id, item_id, qty.quantity)

@app.delete('/cart/{session_id}/remove/{item_id}')
def remove_cart_item(session_id: str, item_id: int, db: Session = Depends(get_db))::
    return crud.remove_cart_item(db, session_id, item_id)

@app.delete('/cart/{session_id}/clear')
def clear_cart(session_id: str, db: Session = Depends(get_db)):
    return crud.clear_cart(db, session_id)

