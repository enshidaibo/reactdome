import { useState } from 'react'
import immutable from 'seamless-immutable';

const useDataImmutable = (data) => useState(immutable(data))

export default useDataImmutable