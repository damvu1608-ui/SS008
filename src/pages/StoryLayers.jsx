import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import * as d from './storyData'
import './story.css'

// Hiệu ứng duy nhất cho cả trang: hiện nhẹ khi cuộn tới, chỉ chạy một lần.
const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function Layer({ id, children }) {
  const meta = d.layers.find((l) => l.id === id)
  return (
    <section className="ks-layer" id={id}>
      <motion.header {...reveal}>
        <h2>{meta.title}</h2>
        <p className="ks-lead">{meta.lead}</p>
      </motion.header>
      {children}
    </section>
  )
}

function Events() {
  const p = d.pardon
  return (
    <Layer id="su-kien">
      <ol className="ks-timeline">
        {d.timeline.map(([date, text]) => (
          <motion.li key={date} {...reveal}>
            <time>{date}</time>
            <span>{text}</span>
          </motion.li>
        ))}
      </ol>
      <div className="ks-split">
        <motion.div className="ks-panel" {...reveal}>
          <p className="ks-big">{p.scale}</p>
          <p>{p.scaleNote}</p>
          <ul className="ks-list">
            {p.people.map(([n, r]) => (
              <li key={n}><b>{n}</b>, {r}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="ks-panel ks-note" {...reveal}>
          <h3>Bản chất pháp lý</h3>
          <p>{p.legal}</p>
          <h3>Tiền lệ đặc xá chaebol</h3>
          <ul className="ks-list">
            {p.precedents.map(([n, y]) => (
              <li key={n}>{n}: <b>{y}</b></li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.ol className="ks-chain" {...reveal}>
        {p.loop.map((s) => <li key={s}>{s}</li>)}
      </motion.ol>
    </Layer>
  )
}

function Context() {
  return (
    <Layer id="boi-canh">
      <div className="ks-grid3">
        {d.stats.map(([n, t]) => (
          <motion.div className="ks-stat" key={n} {...reveal}>
            <p className="ks-big">{n}</p>
            <p>{t}</p>
          </motion.div>
        ))}
      </div>
      <h3 className="ks-sub">Ba nhu cầu của Hàn Quốc từ chaebol</h3>
      <div className="ks-grid3">
        {d.needs.map(([t, x]) => (
          <motion.div className="ks-panel" key={t} {...reveal}>
            <h4>{t}</h4>
            <p>{x}</p>
          </motion.div>
        ))}
      </div>
    </Layer>
  )
}

function Chaebol() {
  const c = d.chaebol
  return (
    <Layer id="chaebol">
      <motion.p className="ks-def" {...reveal}>{c.definition}</motion.p>
      <div className="ks-grid4">
        {c.traits.map(([t, x]) => (
          <motion.div className="ks-panel" key={t} {...reveal}>
            <h4>{t}</h4>
            <p>{x}</p>
          </motion.div>
        ))}
      </div>
      <div className="ks-scroll">
        <table className="ks-table">
          <thead>
            <tr><th>Chaebol</th><th>Trụ cột công nghiệp</th><th>Tác động vĩ mô</th></tr>
          </thead>
          <tbody>
            {c.big4.map(([a, b, x]) => (
              <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{x}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="ks-sub">Samsung trong con số</h3>
      <div className="ks-grid4">
        {c.samsung.map(([n, t]) => (
          <motion.div className="ks-stat" key={n} {...reveal}>
            <p className="ks-big">{n}</p>
            <p>{t}</p>
          </motion.div>
        ))}
      </div>
      <div className="ks-split">
        <motion.div className="ks-panel ks-against" {...reveal}>
          <h3>Mặt trái của mô hình</h3>
          <ul className="ks-list">{c.dark.map((x) => <li key={x}>{x}</li>)}</ul>
        </motion.div>
        <motion.div className="ks-panel ks-for" {...reveal}>
          <h3>Vì sao sự trở lại của ông Lee có ý nghĩa kinh tế</h3>
          <ul className="ks-list">
            {c.whyReturn.map(([t, x]) => <li key={t}><b>{t}.</b> {x}</li>)}
          </ul>
        </motion.div>
      </div>
    </Layer>
  )
}

function Government() {
  const g = d.government
  return (
    <Layer id="chinh-phu">
      <motion.blockquote className="ks-statement" {...reveal}>
        {g.statement}
        <footer>{g.note}</footer>
      </motion.blockquote>
      <div className="ks-grid3">
        {g.quotes.map(([who, q]) => (
          <motion.figure className="ks-panel ks-quote" key={who} {...reveal}>
            <blockquote>{q}</blockquote>
            <figcaption>{who}</figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="ks-fine">Các câu trích được diễn đạt lại gọn. Đối chiếu bản gốc trước khi dùng nguyên văn.</p>
      <ol className="ks-steps">
        {g.steps.map(([t, x], i) => (
          <motion.li key={t} {...reveal}>
            <span className="ks-num">{i + 1}</span>
            <div><h4>{t}</h4><p>{x}</p></div>
          </motion.li>
        ))}
      </ol>
    </Layer>
  )
}

function Debate() {
  const { against, for: pro } = d.debate
  const col = (cls, label, side) => (
    <motion.div className={`ks-panel ${cls}`} {...reveal}>
      <h3>{label}</h3>
      <p className="ks-fine">{side.who}</p>
      <ul className="ks-list">{side.points.map((p) => <li key={p}>{p}</li>)}</ul>
    </motion.div>
  )
  return (
    <Layer id="tranh-luan">
      <div className="ks-split">
        {col('ks-against', 'Phản đối', against)}
        {col('ks-for', 'Ủng hộ', pro)}
      </div>
    </Layer>
  )
}

function Myths() {
  const [open, setOpen] = useState(0)
  return (
    <Layer id="hieu-sai">
      <div className="ks-acc">
        {d.myths.map(([m, f], i) => {
          const on = open === i
          return (
            <div className="ks-acc-item" key={m}>
              <button
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span>{m}</span>
                <ChevronDown size={20} className={on ? 'ks-rot' : ''} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    className="ks-acc-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p>{f}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Layer>
  )
}

function Tradeoff() {
  return (
    <Layer id="danh-doi">
      <div className="ks-split">
        <motion.div className="ks-panel ks-for" {...reveal}>
          <h3>Lợi ích kinh tế kỳ vọng</h3>
          <ul className="ks-list">{d.tradeoff.gain.map((x) => <li key={x}>{x}</li>)}</ul>
        </motion.div>
        <motion.div className="ks-panel ks-against" {...reveal}>
          <h3>Chi phí xã hội và tư pháp</h3>
          <ul className="ks-list">{d.tradeoff.cost.map((x) => <li key={x}>{x}</li>)}</ul>
        </motion.div>
      </div>
    </Layer>
  )
}

function Conclusion() {
  const c = d.conclusion
  return (
    <Layer id="ket-luan">
      <motion.div className="ks-flow" {...reveal}>
        <div className="ks-flow-in">{c.inputs.map((x) => <span key={x}>{x}</span>)}</div>
        <div className="ks-flow-mid">{c.result}</div>
        <div className="ks-flow-out">{c.outputs.map((x) => <span key={x}>{x}</span>)}</div>
      </motion.div>
      <motion.p className="ks-takeaway" {...reveal}>{c.takeaway}</motion.p>
      <footer className="ks-refs">
        <h3>Tài liệu tham khảo</h3>
        <ul>{d.references.map((r) => <li key={r}>{r}</li>)}</ul>
      </footer>
    </Layer>
  )
}

// Gắn component này vào một route/trang riêng, không đụng trang tổng quan.
export default function StoryLayers() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="ks">
        <nav className="ks-nav" aria-label="Các tầng nội dung">
          {d.layers.map((l) => <a key={l.id} href={`#${l.id}`}>{l.title}</a>)}
        </nav>
        <main>
          <Events />
          <Context />
          <Chaebol />
          <Government />
          <Debate />
          <Myths />
          <Tradeoff />
          <Conclusion />
        </main>
      </div>
    </MotionConfig>
  )
}
