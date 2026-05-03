// @tunneled

import path from 'path'
import fs from 'fs'

export async function storeActions(params: { actions: string }) {
  const { actions } = params
  const actionsPath = path.join(__dirname, 'actions.json')
  fs.writeFileSync(actionsPath, actions, 'utf-8')
  return true
}

export async function readActions() {
  const actionsPath = path.join(__dirname, 'actions.json')
  return fs.readFileSync(actionsPath, 'utf-8')
}
