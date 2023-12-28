import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Footer, Header } from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AddIcon, ArrowBackIcon } from "@/assets/icons";
import MpesaLogo from "@/assets/logo-mpesa.png";
import AirtelMoneyLogo from "@/assets/logo-airtel-money.jpg";
import OrangeMoneyLogo from "@/assets/logo-orange-money.jpg";
import request from "@/request";
// import { Invoice } from "@/type";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  // const [invoice, setInvoice] = React.useState<Invoice | null>(null);
  const [operator, setOperator] = React.useState<
    "vodacom" | "orange" | "airtel"
  >("vodacom");
  const [currency, setCurrency] = React.useState<"cdf" | "usd">("cdf");
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   fetchInvoice();
  // }, [state?.invoiceId]);

  // const fetchInvoice = async () => {
  //   try {
  //     const { data } = await request.get("facture/" + state?.invoiceId);
  //     setInvoice(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function makePayment() {
    if (!phoneNumber.trim()) return;

    setHasError(false);
    setIsLoading(true);

    try {
      const res = await request.post("api/gateway", {
        "Amount": state?.amount,
        "CallbackUrl": "any",
        "Currency": currency.toUpperCase(),
        "Hash": "0000",
        "MerchantReference": "any",
        "MerchantId": "52e7f181-86ef-4cdc-9b42-c1062dfad3d2",
        "MerchantPass": "0000",
        "OperationType": "debit",
        "PhoneNumber": phoneNumber,
        "ServiceOperator": operator,
        "TransactionReference": "any",
        "Transaction": ""
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative pt-20">
      <Header />

      <section className="max-w-2xl mx-auto flex justify-center pt-5 pb-20">
        <div className="w-full">
          <Button
            variant={"ghost"}
            className="m-0 px-2"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon className="mr-2 w-5 h-5" />
            Retour
          </Button>
          {/* Info User */}
          <div className="py-5 px-2">
            <div>
              Client(e) trouvé(e):{" "}
              <span className="font-bold">Sadala Kayumba Nathan</span>
            </div>
            <div>
              Numéro du compteur:{" "}
              <span className="font-bold">{state?.invoiceId}</span>
            </div>
          </div>
          {/* Invoices */}
          <div className="px-2">
            <h5 className="text-lg font-bold mb-3">Détails de la facture</h5>
            {/*  */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] ">Mois</TableHead>
                  <TableHead>Consommation</TableHead>
                  <TableHead>Dette</TableHead>
                  <TableHead>Montant à payer</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody>
                {invoice && (
                  <TableRow>
                    <TableCell>{invoice?.dateEmission}</TableCell>
                    <TableCell>{invoice?.indiceFacture} m&sup3;</TableCell>
                    <TableCell>{"0"} CDF</TableCell>
                    <TableCell>
                      {invoice?.montant?.toLocaleString()} CDF
                    </TableCell>
                  </TableRow>
                )}
              </TableBody> */}

              <TableBody>
                <TableRow>
                  <TableCell className="font-medium pl-0">Mars 2023</TableCell>
                  <TableCell>23 m&sup3;</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    {state?.amount?.toLocaleString()} CDF
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button variant={"ghost"} className="p-2">
              <AddIcon className="mr-2 w-4 h-4" />
              Insérer une autre facture
            </Button>
          </div>

          {/*  */}
          <div className="bg-gray-50 rounded-2xl w-full py-5 px-6 mt-5 space-y-3">
            <h2 className="font-bold text-lg mb-3">Méthode de paiement</h2>

            <div>
              <Label>Choisissez l'opérateur</Label>
              <RadioGroup
                value={operator}
                onValueChange={(value: "vodacom" | "orange" | "airtel") =>
                  setOperator(value)
                }
                className="flex items-center space-x-5 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vodacom" id="vodacom" />
                  <Label
                    htmlFor="vodacom"
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={MpesaLogo}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span>M-PESA</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label
                    htmlFor="orange"
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={OrangeMoneyLogo}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span>Orange Money</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="airtel" id="airtel" />
                  <Label
                    htmlFor="airtel"
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={AirtelMoneyLogo}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span>Airtel Money</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Devise</Label>
              <RadioGroup
                value={currency}
                onValueChange={(value: "cdf" | "usd") => setCurrency(value)}
                className="flex items-center space-x-5 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cdf" id="cdf" />
                  <Label htmlFor="cdf">Franc Congolais (CDF)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usd" id="usd" />
                  <Label htmlFor="usd">Dollar américain (USD)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-3 items-center pt-2">
              <Label>Numéro de télépphone</Label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={({ target }) => setPhoneNumber(target.value)}
                placeholder="+243"
                className="col-span-2 max-w-sm"
              />
            </div>

            <div className="pt-4">
              <Button
                className="w-full h-12 text-md rounded-xl"
                onClick={makePayment}
                disabled={isLoading}
              >
                {isLoading
                  ? "Paiement en cours..."
                  : `Payez ${state?.amount?.toLocaleString()} CDF`}
              </Button>
              {hasError && (
                <p className="text-center mt-3 text-sm">
                  Une erreur s'est produite. Veuillez réessayer
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Payment;
