import { describe } from "node:test";
import 'jest'
import supertest from "supertest";
import createServer from "../utils/app";
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose";
import Etablissement from "../model/etablissementModel";



const app = createServer()

const userId = new mongoose.Types.ObjectId().toString();


const establishmentPayload = {       
        name: "Le café des sports",
        email: "bouaki.arthura@gmail.com",
        phone: "0654228987",
        maxCapacity: "50",
        description: "Besoin de décompresser et de se défouler après une longue journée stressante ? Venez au CDS - Café des Sports, un bar animé installé dans le 20ème arrondissement parisien. Ce bistrot est situé à l’angle de la rue Ménilmontant et de la rue Boyer, dans le quartier branché de Belleville. L’adresse est à 850 mètres de la station Gambetta, joignable via la ligne 3 du métro",
        theme: [
          "",
          "Anniversaire",
          "",
          "",
          "Autre"
        ],
        image: [
          "https://firebasestorage.googleapis.com/v0/b/idoevent-66a5e.appspot.com/o/images%2Fbouaki.arthur%40gmail.com%2FLe%20caf%C3%A9%20des%20sports.jpg?alt=media&token=e2c85a9d-2608-4337-a1ef-6f5406fd5b75",
          "",
          "",
          ""
        ],
        location: {
          longitudes: 2.39208,
          latitudes: 48.86924,
          formatAdresse: "94 Rue de Ménilmontant, Paris, IDF 75020, FR"
        },
        distance: 0,
        address: {
          addressNumber: 94,
          addressName: "rue de menilmontant",
          postalCode: "75020"
        }
      
  };

  const establishmentPayload2 = {       
    name: "Le caf des sport",
    email: "bouaki.arthur@gmail.com",
    phone: "0654228984",
    maxCapacity: "58",
    description: "de se défouler après une longue journée stressante ? Venez au CDS - Café des Sports, un bar animé installé dans le 20ème arrondissement parisien. Ce bistrot est situé à l’angle de la rue Ménilmontant et de la rue Boyer, dans le quartier branché de Belleville. L’adresse est à 850 mètres de la station Gambetta, joignable via la ligne 3 du métro",
    theme: [
      "",
      "",
      "",
      "",
      ""
    ],
    image: [
      "https://firebasestorage.googleapis.com/v0/b/idoevent-66a5e.appspot.com/o/images%2Fbouaki.arthur%40gmail.com%2FLe%20caf%C3%A9%20des%20sports.jpg?alt=media&token=e2c85a9d-2608-4337-a1ef-6f5406fd5b75",
      "",
      "",
      ""
    ],
    location: {
      longitudes: 2.39208,
      latitudes: 48.86924,
      formatAdresse: "94 Rue de Ménilmontant, Paris, IDF 75020, FR"
    },
    distance: 0,
    address: {
      addressNumber: 94,
      addressName: "rue de menilmontant",
      postalCode: "75020"
    }
  
};

describe('etablissement', () =>{

    beforeAll(async() => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })


    afterAll(async() => {
        await mongoose.disconnect()
        await mongoose.connection.close();
    })

    describe('get etablissement controller', () => {
        describe ("cet établissement n'existe pas", () => {
            it("should return a 404", async() => {
                const email = 'email-123'
                await supertest(app).get(`/accueil/etablissement/menu/gerer/${email}`).expect(404)
            })
        })
    })

    describe('get etablissement controller', () => {
        describe ("cet établissement existe", () => {
            it("should return a 200 and the establishment", async() => {
                const etablissement = await Etablissement.create(establishmentPayload)
                const { body, statusCode } = await supertest(app).get(
                    `/accueil/etablissement/menu/gerer/${etablissement.email}`
                  );
          
                  expect(statusCode).toBe(201);
          
                  expect(body.etablissement.email).toBe(etablissement.email);
            })
        })
    })

    describe('post etablissement controller', () => {
      describe ("cet établissement existe déjà", () => {
          it("should return a 400", async() => {
            const { statusCode } = await supertest(app).post("/accueil/etablissement/inscription");

            expect(statusCode).toBe(500);
          })
      })
  })

  describe('post etablissement controller', () => {
      describe ("cet établissement existe", () => {
          it("should return a 201 and create the product", async() => {
            const { statusCode, body } = await supertest(app)
              .post("/accueil/etablissement/inscription")
              .send(establishmentPayload2);

            expect(statusCode).toBe(201);
          })
      })
  })
})