from pydantic import BaseModel
from typing import List, Optional

class ProductBase(BaseModel):
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

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1
    size: Optional[str] = None

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    size: Optional[str]
    product: Product
    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    session_id: str
    items: List[CartItemOut]
    total_items: int
    subtotal: float
    class Config:
        from_attributes = True
