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
import request from "@/request";
import { Invoice } from "@/type";

function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [number, setNumber] = React.useState<string>("");
  const [invoices, setInvoices] = React.useState<Array<Invoice>>([]);

  React.useEffect(() => {
    if (params?.id) {
      setNumber(params.id);
    }
  }, [params?.id]);

  React.useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await request.get("facture");
      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Button disabled={number.trim().length < 10} onClick={() => {}}>
              Rechercher
            </Button>
          </div>
          {/* Info User */}
          <div className="py-5">
            <div>
              Abonné(e) trouvé(e):{" "}
              <span className="font-bold">Sadala Kayumba Nathan</span>
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
              {invoices?.map((invoice, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium pl-0">
                    {invoice.dateEmission}
                  </TableCell>
                  <TableCell>{invoice.indiceFacture} m&sup3;</TableCell>
                  <TableCell>{"0"} CDF</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <span>{invoice.montant.toLocaleString()} CDF</span>
                      <Button
                        variant={"secondary"}
                        className="w-8 h-8 p-0"
                        onClick={() =>
                          navigate("/payment", {
                            state: { invoiceId: invoice?.id },
                          })
                        }
                      >
                        <ArrowRightIcon className="w-7 h-7" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Details;
