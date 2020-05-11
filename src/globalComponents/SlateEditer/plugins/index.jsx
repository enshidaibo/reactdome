import addPlugins from './addPlugins'

import MarkButtons from './BasicTool/renderMarkButton'
import BlockButtons from './BasicTool/renderBlockButton'
import Separate from "./BasicTool/Separate";
import Color from "./Color/Color";
import FontSize from "./FontSize/FontSize";
import Links from "./Links";
import Images from "./Images";
import Video from "./Video";
import Audio from "./Audio";
import Table from "./Table";
import Align from "./Align";
import Format from "./Format";
import Search from "./Search";
import RedoUndo from "./RedoUndo";

const plugins = addPlugins([
    ...MarkButtons,
    Color,
    FontSize,
    Separate,
    ...BlockButtons,
    Separate,
    Links,
    Images,
    Video,
    Audio,
    Table,
    Separate,
    Align,
    Format,
    Separate,
    Search,
    RedoUndo,
    Separate,
])

export default plugins
