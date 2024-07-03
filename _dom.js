const img = document.querySelector("#img");
const btn = document.querySelector("#btn");
const downloadBtn = document.querySelector("#downloadBtn");
const text = document.querySelector("#text");
const loader = document.querySelector("#loader");
const historyContainer = document.querySelector("#history");
const chooseModel = document.querySelector("#chooseModel");
const modelInfo = document.querySelector("#model-info-text"); // Get the model info div

// ===============data=============
const modelDetails = {
  "Melonie/text_to_image_finetuned":
    "These are LoRA adaption weights for runwayml/stable-diffusion-v1-5. The weights were fine-tuned on the lambdalabs/pokemon-blip-captions dataset.",

  "mann-e/Mann-E_Dreams":
    "This is the newest SDXL based model from Mann-E platform, which is a generative AI startup based in Iran. ",

  "alvdansen/midsommarcartoon":
    "A retro-style cartoon print model that blends a bit of an anime influence with classic northern european cartoons.",
};
