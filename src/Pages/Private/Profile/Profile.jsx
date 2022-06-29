import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ProfileCollection } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { ProfilePost } from './ProfilePost'
import { PostsContext } from '../../../contexts/PostContext'
import {AnimationContext} from '../../../contexts/AnimationContext'

import './profile.scss';
import { Follow } from '../../../components/Private/Buttons/Follow/Follow.jsx'
import { SectionNav } from '../../../components/Private/section-header/SectionNav.jsx'


export const Profile = () => {
 const { postCategories, currentUserLibrary, setCurrentUserLibrary } = useContext(PostsContext)
 const { profileName } = useParams()
 const currentUser = JSON.parse(localStorage.getItem('user'))
//  console.log(currentUser)
 const readablePostCategories = ["beauty", "arts and craft", "garden", "recipe", "event"]
//  const currentUserLibrary = {
//   beauty: [], artsCraft: [], garden: [], recipe: [], event: []
//  }
  
  //to handle window.width and render the produce navbar only for desktop
  const { windowWidth } = useContext(AnimationContext)
  const [isMobile, setIsMobile] = useState(false)

  console.log(windowWidth)
  useEffect(() => {
    setIsMobile(windowWidth > 1024 ? true : false)
  }, [windowWidth])
 

 useEffect(() => {
  const config = {
    method: "GET",
    credentials: 'include', // specify this if you need cookies
    headers: { "Content-Type": "application/json" }
  };
  const promises = postCategories.map(cat => fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config))
  Promise.all(promises)
         .then(responses => Promise.all( responses.map(r => r.json())) )
         .then(result =>  setCurrentUserLibrary(result)) // result.forEach(catArr =>  setCurrentUserLibrary({...currentUserLibrary, [catArr[0].type]: catArr})) //currentUserLibrary[cat[0].type] = cat
         .catch(err => console.error(`from Promise all`, err))

        console.log('currentUserLibrary :>> ', currentUserLibrary);
 }, [])

 
 
  return (
    <>
      {isMobile && <SectionNav  />}
    <section className="Profile">
      <section className="Profile-inner">

        <section className="Profile-header">
          <button>...</button>

          <section className="Profile-info">
            <img src={currentUser.avatar}></img>
            <section className="Profile-text">
              <h1>{currentUser.profileName}</h1>
              <p>Gardner</p>
              <p>I'm all about plants, and herbs</p>
              <h2>
                {currentUser.userAddress.city} ,{" "}
                {currentUser.userAddress.country}
              </h2>
            </section>
          </section>

          <section className="Profile-followers">
            <Follow user={currentUser._id} users={currentUser._id} />
            <p>100 followers</p>
            <p>10 following</p>
          </section>
        </section>

        <section className='Profile-Library'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat omnis consectetur sed architecto ipsa veritatis repudiandae porro nam cumque modi asperiores iste aliquam blanditiis dolores tempore, quas eius exercitationem optio. Animi velit et facere repellendus voluptates iusto, sint ipsa harum, culpa distinctio delectus hic quos, dolorum a odit sunt quibusdam doloribus voluptatem. Numquam autem ipsa alias expedita velit animi tempore est eum, facere accusantium deleniti, at, officiis perferendis praesentium sit. Dolor saepe itaque necessitatibus in quas, nisi repellendus rem modi sequi earum quaerat ullam molestias enim eveniet quisquam fugiat. Qui, hic quo expedita non mollitia pariatur dolores tenetur cumque quaerat quas esse veniam repellendus! Dolorum, praesentium. Debitis, earum! Illo accusamus ad excepturi deleniti, tenetur magnam dolores nobis laboriosam consequatur quia iste quisquam consequuntur a unde velit modi reprehenderit, non amet blanditiis recusandae? Maxime sapiente cupiditate explicabo laborum eligendi dicta praesentium possimus veritatis architecto facere enim perferendis eaque, quaerat, vel accusamus alias rem, quasi ipsa! Quos magni modi voluptatibus distinctio nisi aspernatur explicabo quia illum deleniti quod odio ad officia eum veniam at iure mollitia nulla facere, nesciunt blanditiis incidunt ducimus placeat natus obcaecati. Facere eveniet earum magni sequi? Voluptas beatae ea nobis, eaque iste quis tenetur. Rem saepe odio at repudiandae aut, adipisci assumenda perferendis enim praesentium, sequi recusandae cumque tempore molestias numquam. Fugit fugiat deserunt dolorum beatae exercitationem saepe, recusandae eaque tenetur officiis consequatur rerum. Amet veritatis omnis harum voluptatibus, sit vitae ab fugit ipsum perferendis quas molestias voluptate. Ipsam minima, vitae, quasi temporibus voluptatum ex iusto reprehenderit rerum rem, magni dicta voluptatem quam exercitationem quidem. Impedit quasi minus natus delectus praesentium totam, facere, soluta aspernatur cupiditate sequi incidunt modi ex necessitatibus perferendis enim ullam magnam harum ipsa, eaque odit est? Minus corporis autem vero blanditiis vitae repudiandae error optio nihil enim molestiae dicta assumenda, temporibus distinctio mollitia saepe magni ipsam ut nobis architecto repellat voluptatibus aperiam? Minima doloremque ut est saepe velit, at soluta consequuntur aspernatur doloribus earum facere? Totam excepturi earum fuga illo quae nesciunt nisi corporis reiciendis quam deserunt debitis eos recusandae maiores doloremque maxime quia, iure libero exercitationem aut nobis rem, labore autem? Nobis exercitationem quibusdam laborum blanditiis eum eius laboriosam vitae iusto eaque repudiandae, itaque quo rerum unde repellat iste sed similique minima voluptatem. Iusto sit, cum voluptatem sint molestiae illum voluptatibus omnis deserunt laboriosam, similique accusantium magni. Hic, saepe obcaecati placeat illum animi asperiores dicta quibusdam nemo dolore autem laborum et quae possimus dolorem quasi error tenetur dolorum quod magni ipsam excepturi, aliquam ratione. Velit placeat, delectus voluptate doloribus at tempore. Tenetur nisi voluptates, nostrum ut, animi quia molestias eum a ducimus culpa facere illum veritatis nulla temporibus officiis rerum illo tempora laudantium. Totam distinctio sed iusto, blanditiis similique adipisci aliquid, corporis assumenda tempore accusantium neque voluptas reiciendis, molestias vero corrupti illo mollitia omnis commodi voluptates est! Cumque aliquid culpa dolorem quibusdam fugiat reprehenderit vero perspiciatis quidem consequuntur? Totam ipsum inventore cupiditate voluptas, iusto dolorem perspiciatis, obcaecati porro hic repudiandae facilis reprehenderit! Odit doloribus dolore ab eaque necessitatibus maxime. Illo, minus ex amet nobis nulla consequuntur architecto eum, natus, in eligendi enim blanditiis! Molestiae fuga vel rerum ullam temporibus esse perspiciatis laboriosam, praesentium iure similique cum culpa rem itaque tempore in aliquid deserunt quasi saepe et? Nobis necessitatibus magnam debitis, sint sed quos! Dolor vero atque nostrum, fuga voluptatem quidem adipisci iure provident eligendi culpa ex ratione sed rem dolorum, dolore repudiandae a enim doloremque delectus perspiciatis quasi totam. Optio, facere! Cum officia rerum incidunt consequatur, veniam ullam dolorum quaerat provident dignissimos. Porro cum quo, provident tempora ad vero neque earum id! Rerum, vitae enim. Eveniet unde eius, repellat doloremque labore consequuntur similique tenetur deleniti aliquid, mollitia, illum autem minima sint expedita libero sequi velit? Voluptatibus dolorum, voluptatum asperiores numquam ratione corporis repellendus culpa inventore delectus provident debitis ipsum! Dolorem a explicabo accusamus esse sequi sint quos nemo ullam nam, perspiciatis animi rerum. Dolorem eveniet eligendi placeat doloribus odio dolorum sint earum rerum, dolores consectetur dicta corporis excepturi sit, voluptas est. Ab, id illum voluptatem asperiores odit totam eaque hic numquam cum provident alias consequuntur repudiandae laudantium quidem laborum recusandae impedit cumque magnam neque dolorum vel autem ipsam! Beatae nisi neque doloremque rerum harum laboriosam sunt suscipit consequatur sit facere impedit dolorem repellat voluptates, corporis distinctio quaerat possimus dicta facilis voluptatum totam eos. Rerum, nulla sunt officiis optio iste repudiandae voluptas tenetur animi quisquam odio ea ratione vitae vero molestias incidunt nostrum eos dolorem. Ex quia error quasi, sit temporibus, illo neque et fugit quae odio explicabo ut libero deleniti blanditiis, aut iure alias pariatur repellendus consectetur dicta! Eveniet placeat officiis quos voluptas animi suscipit, rerum numquam nemo saepe laudantium obcaecati similique? Voluptate perferendis officia laborum provident officiis neque corporis, ea ratione possimus quas impedit labore dolores quae quos culpa obcaecati asperiores, voluptates suscipit rem voluptatum quisquam fugit amet. Quod nostrum obcaecati eveniet beatae corrupti voluptates sint ad atque! Fugiat repellat ratione dolor animi ex! Maiores omnis pariatur, blanditiis quam nostrum, cumque quo nihil tempore quaerat at quibusdam! Sequi at veritatis sunt omnis. Nulla mollitia ipsam, dolorem porro voluptas enim, ea velit pariatur ducimus itaque molestiae nostrum tempore culpa nobis ab architecto. Illum dicta repudiandae nulla inventore dignissimos iste exercitationem aspernatur error enim delectus? Vel reiciendis sapiente explicabo fugit repellendus quas commodi blanditiis assumenda a. Repellat, perferendis, ducimus ab pariatur assumenda sint reiciendis facere iusto explicabo tempora inventore nobis sed cumque quasi impedit quisquam molestiae eveniet. Sed natus, dolore at, consequatur doloremque itaque dolorum sapiente aperiam tempore ad fuga quia quas a iure impedit ducimus minima placeat provident commodi aspernatur ratione maiores. Laudantium, obcaecati molestiae omnis aliquid expedita vero deserunt voluptate commodi perferendis necessitatibus! Porro, nostrum, laudantium magni, assumenda eum fuga pariatur facilis eos optio fugit nesciunt asperiores quam. Est exercitationem assumenda delectus ipsa voluptatem adipisci. Fugit praesentium ab eveniet doloribus possimus ipsam provident nam cum esse corporis deserunt in explicabo, perspiciatis, labore numquam commodi laboriosam quam! Totam quisquam ducimus non atque neque recusandae sunt tempora velit natus adipisci repudiandae tempore ut, molestias, officia perspiciatis nobis. Minima ullam quos accusantium dolore odio qui, nemo laudantium sit at neque exercitationem ratione est impedit ut tempora recusandae. Ullam excepturi architecto reiciendis vitae quasi tempore facere sed quos sunt beatae possimus incidunt amet ea sint temporibus aspernatur debitis delectus voluptatibus expedita, laudantium non voluptate neque? Molestias, animi ex. Aut odio architecto autem placeat. Praesentium distinctio quisquam consequatur quas quibusdam saepe blanditiis quod? Laudantium fugit velit excepturi, ex tempore dolor nobis ad asperiores earum porro mollitia numquam consectetur eum ducimus tenetur, ipsam corporis. Deserunt obcaecati provident sint nesciunt illum recusandae sunt hic fugiat eum. Quasi provident laboriosam debitis, laudantium mollitia deserunt, quae quas quis reprehenderit modi libero iusto excepturi error in numquam temporibus! Eius adipisci hic temporibus ad ratione corrupti nam reprehenderit velit itaque natus quibusdam quam commodi alias omnis, accusantium ullam explicabo dolores ducimus. Explicabo nisi perspiciatis aspernatur saepe? Natus amet beatae nulla enim optio soluta repudiandae ea quidem esse atque obcaecati, delectus accusamus autem similique, veniam praesentium odit quia maiores tempora repellendus. Quas consequuntur officia earum optio nemo? Fugiat, id in. Quam, minima voluptatem optio vero error architecto rerum ducimus nesciunt reiciendis, ratione deleniti excepturi quibusdam ipsam dolorem sunt. Debitis impedit facilis incidunt odit in minus eaque ut officia sunt voluptatem, aliquid odio fuga iure totam repudiandae. Ab, ipsum placeat officia assumenda deleniti voluptate sit perferendis debitis, magnam illo modi atque ratione nulla rem dignissimos. Quo sed fugiat impedit sit, tempore nostrum maxime nam nobis minima aut libero veritatis rem sequi consequuntur ullam facere explicabo cumque enim! Quae tempore sint reprehenderit praesentium iure enim dignissimos quibusdam assumenda eveniet commodi placeat nesciunt laborum vero adipisci error similique nobis perspiciatis, itaque expedita ratione fugiat natus officia eligendi! Similique cupiditate totam ut non eligendi laudantium ipsam, ex, consequuntur ipsum velit ab debitis error provident aperiam. Necessitatibus sunt quod numquam laboriosam, sequi culpa neque dolores iste odio veritatis dicta excepturi doloribus voluptate ab ratione at vitae cum voluptatem impedit alias! Rem maxime eligendi voluptates rerum repudiandae corporis nesciunt at voluptatem facere qui nemo aut perspiciatis nisi mollitia excepturi modi amet quam ipsa ab nihil, veritatis alias atque. Alias, sed harum minus labore temporibus nam animi maxime numquam sequi nesciunt accusamus iusto cupiditate aspernatur dolor et a ab repellat libero, perspiciatis quod. Molestiae cumque architecto magnam neque tenetur consequatur labore praesentium dolore error reprehenderit voluptate non ratione unde eius perferendis, animi consequuntur eum, delectus inventore culpa quam pariatur. Ipsam error praesentium ex eveniet quo! Neque, sapiente adipisci repellat dicta odit cum voluptatum assumenda non quod, facere corporis id exercitationem aperiam omnis recusandae at optio ipsum accusantium. Neque, consequuntur explicabo? Fuga rerum omnis magni veritatis animi, id praesentium hic placeat eos quam blanditiis recusandae nam deserunt tempora doloribus ad quod tempore molestiae. Perspiciatis adipisci hic distinctio, voluptatum reprehenderit facilis explicabo minus pariatur nobis harum qui velit modi eaque saepe iusto amet assumenda vitae ratione unde. Vitae culpa mollitia saepe quas quasi in et nam voluptas laborum, inventore error cumque modi perferendis necessitatibus voluptatibus doloribus cum sit eum amet asperiores corporis reiciendis illum. Voluptatum voluptatibus optio adipisci maxime, quis exercitationem tempore facere.</p>
          <section>

          </section>
        
          <section>


          </section>
        </section>

      </section>
      </section>
      </>
  )
}

// {console.log('currentUserLibrary from return', Object.values(currentUserLibrary))}
// {Object.entries(currentUserLibrary).map((postCat, i) => (
//   console.log('postCat',postCat)
//   postCat[postCategories[i]].length > 0 && <button>{readablePostCategories[i]}</button>
// ))}
// {
//   postCategories.map((postCat, i) => (
//     console.log('currentUserLibrary[`${postCat}`]', currentUserLibrary[`${postCat}`])
//   ) )
// }