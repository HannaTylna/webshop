import { model, Schema } from "mongoose"
import { Order } from "@webshop/shared"

const ItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    _id: false,
    virtuals: {
      total: {
        get() {
          return this.quantity * this.price
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
)

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [ItemSchema],
    shippingCost: { type: Number, default: 50 },
    deliveryAddress: { type: String },
    status: {
      type: String,
      enum: ["registered", "processing", "in delivery", "delivered"],
      default: "registered",
    },
  },
  {
    timestamps: true,
    virtuals: {
      totalCost: {
        get() {
          return this.products.reduce(
            (sum, current) => sum + current.quantity * current.price,
            this.shippingCost
          )
        },
      },
    },
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

export const OrderModel = model<Order>("Order", orderSchema)

export const getAllOrders = async (
  user: string | undefined
): Promise<Order[]> => {
  return OrderModel.find({ user }).exec()
}

export const getCart = async (
  user: string | undefined,
  status: string
): Promise<Order[]> => {
  return OrderModel.find({ user, status }).exec()
}

export const saveOrder = async (order: Order): Promise<Order> => {
  const newModel = new OrderModel(order)
  return await newModel.save()
}
