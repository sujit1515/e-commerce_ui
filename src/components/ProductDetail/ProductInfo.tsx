"use client";
import { useState, useEffect } from "react";
import {
  Heart,
  Eye,
  ChevronDown,
  ChevronUp,
  Star,
  Ruler,
  Zap,
  ShoppingCart
} from "lucide-react";

export interface ProductData {
  badge: string;
  viewCount: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  outOfStock?: string[];
  description: string;
  material: string;
  shipping: string;
}

interface Props {
  product?: ProductData;
}

function Accordion({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#0f172a]">
          {title}
        </span>

        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="pb-4 text-gray-500 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductInfo({ product }: Props) {
  // 🛑 Prevent crash
  if (!product) {
    return (
      <div className="p-10 text-gray-500">
        Loading product...
      </div>
    );
  }

  const [selectedColor, setColor] = useState(
    product.colors?.[0]?.name || ""
  );

  const [selectedSize, setSize] = useState("");
  const [wishlisted, setWish] = useState(false);
  const [cartFlash, setCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleBuy = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
  };

  const handleCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    setCart(true);

    setTimeout(() => setCart(false), 1500);
  };

  return (
    <div className="flex flex-col">

      {/* Badge */}
      <div className="flex items-center gap-3 mb-5">
        <span className="bg-rose-600 text-white text-[9px] font-bold px-3 py-1 rounded-full">
          {product.badge}
        </span>

        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Eye className="w-4 h-4" />
          Recently viewed by {product.viewCount}+ people
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl font-bold">
          ${product.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-300"
              }`}
            />
          ))}

          <span className="text-sm text-gray-500">
            {product.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">
          Color: {selectedColor}
        </p>

        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={`w-8 h-8 rounded-full border ${
                selectedColor === c.name
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">
          Select Size
        </p>

        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setSizeError(false);
              }}
              className={`border rounded-lg py-2 text-sm ${
                selectedSize === s
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {sizeError && (
          <p className="text-xs text-red-500 mt-2">
            Please select size
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mb-6">

        <button
          onClick={handleBuy}
          className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Buy Now
        </button>

        <div className="flex gap-3">

          <button
            onClick={handleCart}
            className="flex-1 border py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartFlash ? "Added ✓" : "Add to Cart"}
          </button>

          <button
            onClick={() => setWish(!wishlisted)}
            className="border rounded-lg w-12 flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 ${
                wishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Accordions */}
      <div>

        <Accordion title="Description">
          {product.description}
        </Accordion>

        <Accordion title="Material & Care">
          {product.material}
        </Accordion>

        <Accordion title="Shipping">
          {product.shipping}
        </Accordion>

      </div>
    </div>
  );
}