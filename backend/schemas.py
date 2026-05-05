from pydantic import BaseModel
from typing import List, Optional

class ProductCreate(BaseModel):
    name: str
    brand: str
    category: str
    price: float
    old_price: Optional[float] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    badge: Optional[str] = None
    in_stock: bool = True
    rating: float = 4.5
    reviews: int = 0

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1
    size: Optional[str] = None

class CartItemUpdate(BaseModel):
    quantity: int
