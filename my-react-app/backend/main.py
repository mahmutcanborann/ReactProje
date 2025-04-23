from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    id: int
    name: str


items_db = [
    Item(id=1, name="Ofis Sandalyesi"),
    Item(id=2, name="Laptop Bilgisayar")
]


@app.get("/items")
def get_items():
    return items_db


@app.post("/items")
def add_item(item: Item):
    for existing in items_db:
        if existing.id == item.id:
            raise HTTPException(status_code=400, detail="Bu ID zaten var.")
    items_db.append(item)
    return {"message": "Ürün başarıyla eklendi"}
class Offer(BaseModel):
    product: str
    description: str
    budget: float
    status: str = "Beklemede"

offers_db: List[Offer] = []

@app.post("/offers")
def create_offer(offer: Offer):
    offers_db.append(offer)
    return {"message": "Teklif başarıyla alındı."}

@app.get("/offers")
def get_offers():
    return offers_db
    
@app.put("/offers/{index}")
def update_offer(index: int, updated_offer: Offer):
    if 0 <= index < len(offers_db):
        offers_db[index] = updated_offer
        return {"message": "Teklif güncellendi."}
    return {"error": "Teklif bulunamadı"}