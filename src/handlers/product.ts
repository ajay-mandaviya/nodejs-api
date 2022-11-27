import prisma from "../db";

/**
 * getAllProducts
 * @param req
 * @param res
 */

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });

  res.json({
    data: user.Product,
  });
};

/**
 * getProductById
 * @param req
 * @param res
 */

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongToId: req.user.id,
    },
  });

  res.json({
    data: product,
  });
};

export const createProduct = async (req, res) => {
  const newProduct = await prisma.product.create({
    data: {
      name: req.body.name,
      belongToId: req.user.id,
    },
  });

  res.json({
    data: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  console.log("inside updateProduct");

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id_belongToId: {
          id: req.params.id,
          belongToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({
      updatedProduct,
      message: "Product Update SuccessFully",
    });
  } catch (error) {
    console.log("error while update", error);
  }
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongToId: {
        id: req.params.id,
        belongToId: req.user.id,
      },
    },
  });
  res.json({
    message: "Product deleted SuccessFully",
  });
};
// 900beaa1-b84c-4647-9c88-ac1e55ace807
