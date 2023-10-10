import { type Media } from 'payload/generated-types'


type ProjectFeature = {
  feature?: string;
  image: string | Media;
  details?: string;
  id?: string;
};

export type ProjectFeatureCardProps = {
  feature: ProjectFeature;
}

export default function ProjectFeatureCard({ feature }: ProjectFeatureCardProps){
  let coverImageUrl = "https://dummyimage.com/600"
  if(typeof feature.image === 'object' && feature.image.url){
    coverImageUrl = feature.image.url
  }

  return (
    
    <article className="pb-6 flex-grow flex-wrap">
      <div
        className="m-0 box-border h-80 rounded-md"
        style={{
          backgroundImage: `url("${coverImageUrl}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
      </div>
      <div className="flex flex-col px-1">
        <h3 className="font-heading py-1">{feature.feature}</h3>
        <p className="font-text">{feature.details}</p>   
      </div>
           
    </article>
  )
}