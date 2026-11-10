import { HugeiconsIcon } from '@hugeicons/react'
import { WhatsappIcon, Mail01Icon, GithubIcon, Globe02Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import Ferrofluid from './reactbits/Ferrofluid/Ferrofluid'
import FlyingButton from './reactbits/FlyingButton/FlyingButton'
import SectionHead from './SectionHead'
import { usePrefs } from '../hooks/usePrefs'

const WA = 'https://wa.me/6281219135378'

const CHANNELS = [
  { href: WA, label: 'WhatsApp', value: 'Chat langsung', icon: WhatsappIcon, ext: true, primary: true },
  { href: 'mailto:waffir.hasan25@smk.belajar.id', label: 'Email', value: 'waffir.hasan25@smk.belajar.id', icon: Mail01Icon },
  { href: 'https://github.com/wafiir051-ai', label: 'GitHub', value: 'github.com/wafiir051-ai', icon: GithubIcon, ext: true },
  { href: 'https://www.godingofficial.com/', label: 'Goding Official', value: 'godingofficial.com', icon: Globe02Icon, ext: true },
]

export default function Contact() {
  const { reduce, fine } = usePrefs()
  const flies = fine && !reduce

  return (
    <section className="sec contact" id="kontak" data-sc-act="flow">
      {!reduce && (
        <div className="contact__bed" aria-hidden="true">
          <Ferrofluid
            colors={['#3ED8A8', '#4a6b60', '#EEF3EF']}
            speed={0.3}
            scale={1.3}
            opacity={0.8}
            brightness={0.9}
            mouseStrength={0.8}
          />
        </div>
      )}
      <div className="contact__scrim" aria-hidden="true" />

      <div className="sc-wrap contact__body" data-sc-in data-sc-stagger="80">
        <SectionHead
          label="Kontak"
          title="Punya proyek? Ceritakan saja."
          intro="Kirim kebutuhanmu lewat WhatsApp atau email, nanti kita bahas detailnya."
        />

        <ul className="channels">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className={`channel cursor-target ${c.primary ? 'channel--primary' : ''}`}
                data-cursor-label={c.label}
                {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="channel__icon">
                  <HugeiconsIcon icon={c.icon} size={22} strokeWidth={1.7} />
                </span>
                <span className="channel__text">
                  <span className="channel__label">{c.label}</span>
                  <span className="channel__value">{c.value}</span>
                </span>
                <span className="channel__go" aria-hidden="true">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} strokeWidth={1.8} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {flies && (
        <>
          <p className="contact__hint" aria-hidden="true">
            Sorot tombol ini
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M6 13l6 6 6-6" />
            </svg>
          </p>
          <div className="contact__pad">
            <FlyingButton
              size="large"
              altitude={520}
              hoverTime={4}
              jets={2}
              radius={6}
              carryCursor
              buttonColor="#3ED8A8"
              textColor="#04211A"
              thrustColor="#9FF0D6"
              smokeColor="#EEF3EF"
              onClick={() => window.open(WA, '_blank', 'noopener,noreferrer')}
            >
              Chat WhatsApp
            </FlyingButton>
          </div>
        </>
      )}
    </section>
  )
}
