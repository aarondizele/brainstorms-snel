import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Footer, Header } from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/assets/icons";

const min = 10000;
const max = 100000;


function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [number, setNumber] = React.useState<string>("");

  React.useEffect(() => {
    if (params?.id) {
      setNumber(params.id);
    }
  }, [params?.id]);

  return (
    <div className="min-h-screen relative pt-20">
      <Header />

      <section className="max-w-2xl mx-auto flex justify-center pt-16 pb-20 bg-white">
        <div className="w-full">
          {/* Searh bar */}
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Entrez le numéro de votre compteur"
              value={number}
              onChange={({ target }) => setNumber(target.value)}
              maxLength={20}
              minLength={10}
            />
            <Button disabled={number.trim().length < 10} onClick={() => { }}>
              Rechercher
            </Button>
          </div>
          {/* Info User */}
          <div className="py-5">
            <div>
              Abonné(e) trouvé(e):{" "}
              <span className="font-bold">Nathan Sadala</span>
            </div>
            <div>
              Numéro du compteur:{" "}
              <span className="font-bold">{params?.id}</span>
            </div>
          </div>
          {/* Invoices */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h5 className="text-xl font-bold">Factures à payer</h5>
            <Button variant={"link"} className="underline p-0 m-0">
              Voir l'historique
            </Button>
          </div>
          {/*  */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] pl-0">Mois</TableHead>
                <TableHead>Consommation</TableHead>
                <TableHead>Dette</TableHead>
                <TableHead>Montant à payer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }, (_, i) => String(i)).map((i) => {
                const amount = Math.floor(Math.random() * (max - min - 1)) + min
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium pl-0">Mars 2023</TableCell>
                    <TableCell>23 m&sup3;</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <span>{amount?.toLocaleString()} CDF</span>
                        <Button
                          variant={"secondary"}
                          className="w-8 h-8 p-0"
                          onClick={() =>
                            navigate("/payment", {
                              state: { meterNumber: params?.id, invoiceId: params?.id, amount: amount },
                            })
                          }
                        >
                          <ArrowRightIcon className="w-7 h-7" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Details;