from sqlalchemy.orm import Session
from app import models, schemas
from sqlalchemy import or_

def get_products(db: Session):
    return db.query(models.Product).order_by(models.Product.id.asc()).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product_quantity(db: Session, product_id: int, quantity: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product:
        product.quantity = quantity
        db.commit()
        db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()
    return product

def search_products(db: Session, query: str):
    q = f"%{query}%"
    return db.query(models.Product).filter(
        or_(
            models.Product.name.ilike(q),
            models.Product.description.ilike(q),
            models.Product.price.like(q)
        )
    ).all()
