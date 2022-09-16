import { Button, Container, Input, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getSigner } from "../../utils/etherjsConnection/signer";

const FindENS = () => {
  const [address, setAddress] = useState<string>("");
  const [ENS, setENS] = useState<string | null>(null);

  const setENSorAddress = async () => {
    try {
      let signer = await getSigner();

      if (signer && address) {
        let ens = await signer.provider.lookupAddress(address);
        if (ens !== null) {
          setENS(ens);
        } else {
          setENS("Not found");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {}, [ENS]);

  return (
    <>
      <div>
        <Container
          lg
          css={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            clearable
            label="Enter Ethereum Address"
            color="success"
            size="lg"
            status="primary"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            css={{ marginLeft: "2rem", marginTop: "1rem" }}
            shadow
            color={"secondary"}
            onClick={setENSorAddress}
          >
            Check ENS
          </Button>
        </Container>
      </div>
      <Text css={{ textAlign: "center" }} h4>
        ENS:{" "}
        <Text h3 color="success">
          {ENS}
        </Text>
      </Text>
    </>
  );
};

export default FindENS;
