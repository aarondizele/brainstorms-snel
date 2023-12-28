import React from "react";
// import request from "@/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "@/components/navigation";

function Home() {
  const navigate = useNavigate();
  const [number, setNumber] = React.useState<string>("");
  const [notFound, setNotFound] = React.useState<boolean>(false);

  const onFindMeter = async () => {
    setNotFound(false);
    try {
      // const { data } = await request.get("compteur/" + number);
      // if (!data) {
      //   return setNotFound(true);
      // }
      navigate(`/details/${number}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen relative">
      <Header />

      <section className="container mx-auto pt-20">
        <div className="flex justify-center py-32 mx-auto md:max-w-lg">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl font-black mb-10">
              Application de paiement de vos factures SNEL en ligne
            </h1>
            <div className="flex w-full max-w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Entrez le numéro de votre compteur"
                value={number}
                onChange={({ target }) => {
                  // if (number.trim().length > 20) return
                  setNumber(target.value);
                }}
                maxLength={20}
                minLength={10}
              />
              <Button
                disabled={number.trim().length < 10}
                onClick={onFindMeter}
              >
                Rechercher
              </Button>
            </div>
            {notFound && (
              <p className="text-center mt-3 text-sm">Aucun compteur n'a été trouvé</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
