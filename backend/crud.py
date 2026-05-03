from sqlalchemy.orm import Session
import models, schemas

SEED_PRODUCTS = [
    {"name": "Air Phantom X", "brand": "Nike", "category": "men", "price": 189.99, "old_price": 229.99,
     "description": "Lightweight running shoe with responsive cushioning.", "badge": "Sale", "rating": 4.8, "reviews": 342,
     "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"},
    {"name": "Velocity Pro", "brand": "Adidas", "category": "men", "price": 210.00, "old_price": None,
     "description": "Performance training shoe built for speed.", "badge": "New", "rating": 4.9, "reviews": 128,
     "image_url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"},
    {"name": "Cloud Stride", "brand": "HOKA", "category": "women", "price": 165.00, "old_price": None,
     "description": "Maximum cushioning for long-distance comfort.", "badge": None, "rating": 4.7, "reviews": 215,
     "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"},
    {"name": "Urban Edge", "brand": "New Balance", "category": "women", "price": 140.00, "old_price": 175.00,
     "description": "Stylish sneaker for everyday wear.", "badge": "Sale", "rating": 4.6, "reviews": 89,
     "image_url": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"},
    {"name": "Trail Blazer GTX", "brand": "Salomon", "category": "men", "price": 245.00, "old_price": None,
     "description": "Gore-Tex trail runner for all conditions.", "badge": "New", "rating": 4.9, "reviews": 67,
     "image_url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"},
    {"name": "Puma Drift", "brand": "Puma", "category": "women", "price": 119.99, "old_price": 149.99,
     "description": "Sleek casual sneaker with memory foam insole.", "badge": "Sale", "rating": 4.5, "reviews": 193,
     "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"},
    {"name": "Mini Runner", "brand": "Skechers", "category": "kids", "price": 69.99, "old_price": None,
     "description": "Durable and fun sneakers for active kids.", "badge": "New", "rating": 4.7, "reviews": 301,
     "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"},
    {"name": "Classic Court", "brand": "Converse", "category": "kids", "price": 55.00, "old_price": 65.00,
     "description": "The timeless canvas shoe kids love.", "badge": "Sale", "rating": 4.8, "reviews": 512,
     "image_url": "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500"},
]

def seed_products(db: Session):
    if db.query(models.Product).count() > 0:
        db.query(models.Product).delete()
        db.commit()
    for p in SEED_PRODUCTS:
        db.add(models.Product(**p))
    db.commit()
    return {"message": "Seeded successfully", "count": len(SEED_PRODUCTS)}

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products_by_category(db: Session, category: str):
    return db.query(models.Product).filter(models.Product.category == category).all()

def get_cart(db: Session, session_id: str):
    from crud_cart import get_cart as _get_cart
    return _get_cart(db, session_id)
