import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Transportation from './pages/Transportation'
import MemberVehicalAddingPage from './pages/MemberVehicalAddingPage'
import MembersDataMyPage from './pages/MembersDataMyPage'
import PageNotFound from './pages/PageNotFound'
import PandiriRataPage from './pages/PandiriRataPage'
import ReceptionPage from './pages/ReceptionPage'
import HaldiFunctionPage from './pages/HaldiFunctionPage'
import WeddingCeremonyPage from './pages/WeddingCeremonyPage'
import WishManagerPage from './pages/WishManagerPage'
import ViewWishesPage from './pages/ViewWishesPage'

const RouterComponent = () => {
  return (
      <Routes>
        {/* <Route path="/manthina/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/members-vehical" element={<MemberVehicalAddingPage />} />
        <Route path="/view-wishes" element={<ViewWishesPage />} />

        <Route path="/manthina/#/rata" element={<PandiriRataPage />} />
        <Route path="/haldi" element={<HaldiFunctionPage />} />
        <Route path="/wedding" element={<WeddingCeremonyPage />} />
        <Route path="/reception" element={<ReceptionPage />} />
        
        <Route path="/members-data" element={<MembersDataMyPage />} />
        <Route path="/wm" element={<WishManagerPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  )
}

export default RouterComponent;
