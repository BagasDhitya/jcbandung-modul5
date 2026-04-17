import prisma from "../src/config/prisma";
import redisClient from "../src/config/redis";
import { getProducts, createProduct } from "../src/services/product.service";

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

// mock akan menukan prisma dan redis yang asli, dengan yang ada di folder __mocks__

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    // test case 1: harus mengembalikan data dari cache kalau ada
    it("should return data from cache if exists", async () => {
      const mockData = [{ id: 1, title: "Product A" }];
      (redisClient.get as jest.Mock).mockResolvedValue(
        JSON.stringify(mockData),
      );
      const result = await getProducts();

      // kalau cache berjalan, maka tidak mengambil data dari prisma
      expect(redisClient.get).toHaveBeenCalled();
      expect(prisma.product.findMany).not.toHaveBeenCalled();

      // kalau data berhasil ditarik, maka akan muncul dalam format JSON
      expect(result).toEqual(JSON.stringify(mockData));
    });

    // test case 2: harus mengambil data dari DB, kalau cachenya masih kosong
    it("should fallback to DB if redis error", async () => {
      const mockData = [{ id: 1, title: "Product A" }];

      // kalau cache tidak berfungsi, maka akan difallback ke DB
      (redisClient.get as jest.Mock).mockRejectedValue(new Error("Redis down"));
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockData);

      const result = await getProducts();

      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  // fitur create product
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
});
