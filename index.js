const path = require("path");
const fsp = require("fs/promises");
const { storeNFTs } = require("./storeNFTs");

const imagesPath = path.resolve("images");
const nftMetadataFiles = path.resolve("NFTMetadataFiles");

const writeJsonToFile = async (filePath, data) => {
  try {
    await fsp.writeFile(filePath, data);
  } catch (err) {
    console.error("##Error in Writing a File", err);
  }
};

storeNFTs(imagesPath)
  .then(async (metadata) => {
    for (const [index, data] of metadata.entries()) {
      const filePath = `${nftMetadataFiles}/tokenURI-${index}.json`;
      await writeJsonToFile(filePath, JSON.stringify(data));
    }
  })
  .catch((err) => console.error("##err", err));
