import { ArtilleryPage_Acfhome_Hero } from "@api/gql/types"

// ####
// #### Types
// ####

type PropsType = {
  hero: ArtilleryPage_Acfhome_Hero
}

// ####
// #### Component
// ####

const Hero = ({ hero }: PropsType) => {
  return (
    <>
      {hero.image?.sourceUrl && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src={hero.image.sourceUrl}
            alt=""
            className="w-full h-full object-center object-cover"
          />
        </div>
      )}
      {hero.overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: hero.overlay.color || "#111827",
            opacity: hero.overlay.opacity || 0.5,
          }}
        />
      )}
      <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        {hero.title && (
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
            {hero.title}
          </h1>
        )}
        {hero.text && <p className="mt-4 text-xl text-white">{hero.text}</p>}
        {hero.link && (
          <a
            href={hero.link.url || "#"}
            className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            {hero.link.label}
          </a>
        )}
      </div>
    </>
  )
}

export default Hero
