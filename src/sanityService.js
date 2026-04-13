import { client } from './sanityClient'

export const getHeroData = async () => {
  return await client.fetch(`*[_type == "hero"][0]`)
}

export const getAboutData = async () => {
  return await client.fetch(`*[_type == "about"][0]`)
}

export const getProgramOverviewData = async () => {
  return await client.fetch(`*[_type == "programOverview"][0]`)
}

export const getTestimonials = async () => {
  return await client.fetch(`*[_type == "testimonial"] | order(order asc)`)
}

export const getPartners = async () => {
  return await client.fetch(`*[_type == "partner"] | order(order asc)`)
}
