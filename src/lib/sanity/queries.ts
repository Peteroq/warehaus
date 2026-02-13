export const allProjects = `*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  title,
  slug,
  client,
  year,
  description,
  coverImage,
  categories[]->{ _id, name, slug, color },
  services,
  featured,
  order,
  color,
  modelUrl
}`;

export const projectBySlug = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  year,
  description,
  body,
  coverImage,
  gallery,
  categories[]->{ _id, name, slug, color },
  services,
  featured,
  color,
  modelUrl
}`;

export const featuredProjects = `*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  client,
  year,
  description,
  coverImage,
  categories[]->{ _id, name, slug, color },
  services,
  color
}`;

export const allCategories = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color
}`;

export const siteSettings = `*[_type == "siteSettings"][0] {
  studioName,
  tagline,
  email,
  phone,
  socialLinks,
  seo
}`;

export const allTeamMembers = `*[_type == "teamMember"] | order(name asc) {
  _id,
  name,
  role,
  bio,
  photo,
  socialLinks
}`;
