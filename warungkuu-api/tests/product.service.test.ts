import prisma from "../src/config/prisma";
import redisClient from "../src/config/redis";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../src/services/product.service";

// inject mock
jest.mock("../src/config/prisma", () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("../src/config/redis", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return data from cache if exists", async () => {
      const mockData = [{ id: 1, title: "Product A" }];
      (redisClient.get as jest.Mock).mockResolvedValue(
        JSON.stringify(mockData),
      );

      const result = await getProducts();

      expect(redisClient.get).toHaveBeenCalled();
      expect(prisma.product.findMany).not.toHaveBeenCalled();
      expect(result).toEqual(JSON.stringify(mockData));
    });

    it("should fallback to DB if redis error", async () => {
      const mockData = [{ id: 1, title: "Product A" }];

      (redisClient.get as jest.Mock).mockRejectedValue(new Error("Redis down"));
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockData);

      const result = await getProducts();

      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe("createProduct", () => {
    it("should create product", async () => {
      const data = {
        title: "Test",
        description: "Lorem ipsum",
        price: 100,
        stock: 10,
      };

      (prisma.product.create as jest.Mock).mockResolvedValue(data);

      const result = await createProduct(data);

      expect(prisma.product.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(data);
    });
  });

  describe("getProductById", () => {
    it("should return product by id", async () => {
      const mockProduct = {
        id: "1",
        title: "Product A",
        deletedAt: null,
      };

      (prisma.product.findFirst as jest.Mock).mockResolvedValue(mockProduct);

      const result = await getProductById("1");

      expect(prisma.product.findFirst).toHaveBeenCalledWith({
        where: {
          id: "1",
          deletedAt: null,
        },
      });

      expect(result).toEqual(mockProduct);
    });

    it("should return null if product not found", async () => {
      (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await getProductById("999");

      expect(result).toBeNull();
    });
  });

  describe("updateProduct", () => {
    it("should update product", async () => {
      const id = "1";
      const data = {
        title: "Updated Product",
        price: 200,
      };

      const updatedProduct = { id, ...data };

      (prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await updateProduct(id, data);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id },
        data,
      });

      expect(result).toEqual(updatedProduct);
    });
  });

  describe("deleteProduct", () => {
    it("should soft delete product", async () => {
      const id = "1";

      const deletedProduct = {
        id,
        deletedAt: new Date(),
      };

      (prisma.product.update as jest.Mock).mockResolvedValue(deletedProduct);

      const result = await deleteProduct(id);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          deletedAt: expect.any(Date),
        },
      });

      expect(result).toEqual(deletedProduct);
    });
  });
});
