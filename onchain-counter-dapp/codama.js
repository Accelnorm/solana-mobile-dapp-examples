import { createCodamaConfig } from "gill";
 
export default createCodamaConfig({
  idl: "src/components/counter/idl/basic_counter.json",
  clientJs: "clients/js/src/generated",
});