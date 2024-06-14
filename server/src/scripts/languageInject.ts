import { PrismaClient } from "@prisma/client";

type Response = {
  languages: Record<string, string>;
};

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding in progress...");
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countryData = (await response.json()) as Response[];

    if (!response.ok) throw new Error("Something went very wrong!");
    const languageSet = new Set();

    countryData.forEach((country) => {
      const language = country.languages;
      if (!language) return;

      const languageValue = Object.values(language);
      languageValue.forEach((lang) => {
        languageSet.add(lang);
      });
    });

    const languageArray = (Array.from(languageSet) as string[]).sort();

    languageArray.forEach(async (lang) => {
      await prisma.languages.create({
        data: {
          language: lang,
        },
      });
    });

    console.log("Successfuly Seeded Language Data");
  } catch (err) {
    console.log(err);
  }
}

seed();
