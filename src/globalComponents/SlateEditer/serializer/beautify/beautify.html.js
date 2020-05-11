import { html } from 'js-beautify';

const config = { space_in_empty_paren: true }
const beautifyHtml = text => html(text, config)

export default beautifyHtml