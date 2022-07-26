const { NFTStorage, File } = require("nft.storage");
const mime = require("mime");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY.toString().trim();

async function storeNFTs(imagesPath) {
  const fullImagesPath = path.resolve(imagesPath);
  const files = await fs.promises.readdir(fullImagesPath);
  let responses = [];
  for (let file of files) {
    // load the file from disk
    const image = await fileFromPath(`${fullImagesPath}/${file}`);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });

    const dogName = file.replace(".png", "");

    const response = await nftstorage.store({
      image,
      name: dogName,
      description: `An adorable ${dogName}`,
    });
    responses.push(response);
  }
  return responses;
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

// const filePath = path.resolve("images", "ape-one.jpg");

// fileFromPath(filePath)
//   .then((data) => console.log("##data", data))
//   .catch((err) => console.error(err));

// console.log("##filePath", filePath);

module.exports = {
  storeNFTs,
};
