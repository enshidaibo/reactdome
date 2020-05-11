import asyncComponents from '@/globalApp/asyncComponents/asyncComponents'
import asyncComponent from '@/globalApp/asyncComponents/asyncComponent'
import yssjfetch from "@/globalApp/yssjfetch";
// import createLocalRudex from '@/globalApp/createLocalRudex';
import createLocalRudex from '@/globalApp/rxjsRudex';
import loadScripts from '@/globalApp/loadScripts';
import jsonschema from '@/globalApp/jsonschema';

const globalRedux = createLocalRudex()

export {
    asyncComponents,
    asyncComponent,
    yssjfetch,
    createLocalRudex,
    globalRedux,
    loadScripts,
    jsonschema,
};
