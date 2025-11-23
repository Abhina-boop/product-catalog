# app/routes/products.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app import schemas, crud, database

router = APIRouter(prefix="/products", tags=["products"])

get_db = database.get_db


# --- READ ALL PRODUCTS ---
@router.get("/", response_model=List[schemas.Product])
def read_products(db: Session = Depends(get_db)):
    return crud.get_products(db)


# --- ADD PRODUCT ---
@router.post("/", response_model=schemas.Product)
def add_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)


# --- UPDATE PRODUCT QUANTITY ---
@router.put("/{product_id}", response_model=schemas.Product)
def update_quantity(product_id: int, quantity: int, db: Session = Depends(get_db)):
    updated = crud.update_product_quantity(db, product_id, quantity)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated


# --- DELETE PRODUCT ---
@router.delete("/{product_id}", response_model=schemas.Product)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_product(db, product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return deleted


# --- SEARCH PRODUCTS ---
@router.get("/search", response_model=List[schemas.Product])
def search_products(query: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    results = crud.search_products(db, query)
    if not results:
        raise HTTPException(status_code=404, detail="No matching products found")
    return results
