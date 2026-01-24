import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const res = await $fetch('https://auth.collapseloader.org/api/statistics', {
      method: 'GET',
      responseType: 'json',
    })
    return res
  } catch (err) {
    event.node.res.statusCode = 502
    return { total_loader_launches: 0, total_client_launches: 0, total_client_downloads: 0 }
  }
})
