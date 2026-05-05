from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Product(Base):
    __tablename__ = "products"
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String, nullable=False)
    brand       = Column(String, nullable=False)
    category    = Column(String, nullable=False)
    price       = Column(Float, nullable=False)
    old_price   = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    image_url   = Column(String, nullable=True)
    badge       = Column(String, nullable=True)
    in_stock    = Column(Boolean, default=True)
    rating      = Column(Float, default=4.5)
    reviews     = Column(Integer, default=0)
    cart_items  = relationship("CartItem", back_populates="product")

class Cart(Base):
    __tablename__ = "carts"
    id         = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True, nullable=False)
    items      = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")

class CartItem(Base):
    __tablename__ = "cart_items"
    id         = Column(Integer, primary_key=True, index=True)
    cart_id    = Column(Integer, ForeignKey("carts.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity   = Column(Integer, default=1)
    size       = Column(String, nullable=True)
    cart    = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")
