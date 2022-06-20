'use strict'

import cjsDep from 'cjs-dep'
import esmDep from 'esm-dep'
import mixedDep from 'mixed-dep'

const main = async () => {
  document.body.innerHTML = `
  cjs: ${cjsDep()}<br/>
  esm: ${esmDep()}<br/>
  mixed: ${mixedDep()}
  `
}

main()
