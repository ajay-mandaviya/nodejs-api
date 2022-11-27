import { body } from "express-validator";

import prisma from "../db";

export const getAllUpdate = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongToId: req.user.id,
      },
      include: {
        Updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.Updates];
    }, []);
    res.status(200).json({
      data: updates,
    });
  } catch (error) {}
};

export const getUpdateById = async (req, res) => {
  try {
    const update = await prisma.update.findFirst({
      where: {
        productId: req.params.id,
      },
    });
    res.json({
      data: update,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something Went Wrong",
    });
  }
};

export const updateByUpdate = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongToId: req.user.id,
      },
      include: {
        Updates: true,
      },
    });

    const allupdates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.Updates];
    }, []);

    const match = allupdates.find((update) => update.id === req.params.id);
    if (!match) {
      return res.json({
        data: "Not Found",
      });
    }
    const newUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({
      data: newUpdate,
    });
  } catch (error) {}
};

export const createUpdate = async (req, res) => {
  console.log("insidecreateUpdate");
  const { productId, ...rest } = req.body;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(400).json({
        message: "Product Not Found for update",
      });
    }
    // const update = await prisma.update.create({
    //   data: {
    //     title: req.body.title,
    //     body: req.body.body,
    //     product: {
    //       connect: {
    //         id: product.id,
    //       },
    //     },
    //   },
    // });
  } catch (error) {
    console.log("error while create", error);
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongToId: req.user.id,
      },
      include: {
        Updates: true,
      },
    });

    const allupdates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.Updates];
    }, []);

    const match = allupdates.find((update) => update.id === req.params.id);
    if (!match) {
      return res.json({
        data: "Not Found",
      });
    }
    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      data: deleted,
      msg: "Deleted SuccessFully!",
    });
  } catch (error) {}
};
