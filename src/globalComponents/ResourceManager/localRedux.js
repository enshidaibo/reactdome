import { useContext } from "react";
import createLocalRudex from '@/Libs/ContextRudex/createLocalRudex';

const localRedux = createLocalRudex()
export const localeContext = () => useContext(localRedux.context)
export default localRedux