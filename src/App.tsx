import { ScrollDepthProvider } from '@/hooks/ScrollDepthContext'
import { OceanBackground } from '@/components/OceanBackground'
import { SubmarineDepth } from '@/components/SubmarineDepth'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Mission } from '@/components/Mission'
import { Team } from '@/components/Team'
import { TeamStats } from '@/components/TeamStats'
import { OfficerBoard } from '@/components/OfficerBoard'
import { JoinUs } from '@/components/JoinUs'
import { RobotSpecs } from '@/components/RobotSpecs'
import { AUVDashboard } from '@/components/AUVDashboard'
import { Competitions } from '@/components/Competitions'
import { Media } from '@/components/Media'
import { SponsorshipTiers } from '@/components/SponsorshipTiers'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <ScrollDepthProvider>
      <div id="top" className="relative min-h-screen">
        <OceanBackground />
        <SubmarineDepth />
        <Nav />
        <main>
          <Hero />
          <Mission />

          {/* OUR TEAM: subteams, who we are, the board, how to join */}
          <Team />
          <TeamStats />
          <OfficerBoard />
          <JoinUs />

          {/* OUR ROBOT: the vehicle spec sheet, then its subsystems */}
          <RobotSpecs />
          <AUVDashboard />
          <Competitions />
          <Media />

          {/* SPONSORS */}
          <SponsorshipTiers />
        </main>
        <Footer />
      </div>
    </ScrollDepthProvider>
  )
}

export default App
