import { HugeiconsIcon } from '@hugeicons/react'
import { WhatsappIcon, Mail01Icon, GithubIcon, Globe02Icon } from '@hugeicons/core-free-icons'
import Ferrofluid from './reactbits/Ferrofluid/Ferrofluid'
import FlyingButton from './reactbits/FlyingButton/FlyingButton'
import { usePrefs } from '../hooks/usePrefs'

const WA = 'https://wa.me/6281219135378'

const LINKS = [
  { href: 'mailto:waffir.hasan25@smk.belajar.id', label: 'Email', icon: Mail01Icon },
  { href: 'https://github.com/wafiir051-ai', label: 'GitHub', icon: GithubIcon, ext: true },
  { href: 'https://www.godingofficial.com/', label: 'Goding Official', icon: Globe02Icon, ext: true },
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
      <div className={`sc-wrap contact__body`} data-sc-in data-sc-stagger="80">
        <div className="contact__text">
          <h2 className="display">Punya proyek? Ceritakan saja.</h2>
          <p className="body">Kirim kebutuhanmu lewat WhatsApp atau email, nanti kita bahas detailnya.</p>
          <div className="contact__links">
            {!flies && (
              <a
                href={WA}
                className="btn btn--primary cursor-target"
                data-cursor-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={18} strokeWidth={1.8} />
                Chat WhatsApp
              </a>
            )}
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="btn btn--line cursor-target"
                data-cursor-label={l.label}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <HugeiconsIcon icon={l.icon} size={18} strokeWidth={1.8} />
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {flies && (
          <div className="contact__pad">
            <FlyingButton
              size="large"
              altitude={520}
              hoverTime={4}
              jets={2}
              radius={4}
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
        )}
      </div>
    </section>
  )
}
