import Image from "next/image";

export default function CTA() {
  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <Image
        className="cta__background"
        src="/assets/cta-workshop.webp"
        alt="Workshop Craftivation Exhibition Contractor"
        fill
        sizes="100vw"
        unoptimized
      />
      <div className="cta__shade" aria-hidden="true" />

      <div className="cta__inner pageShell">
        <div className="cta__copy" data-home-reveal="rise">
          <h2 id="cta-title" className="cta__headline">
            Partner terbaik untuk
            <br />
            optimalkan booth brand Anda
          </h2>

          <div className="cta__actions">
            <a
              className="button button--light"
              href="https://wa.me/6282322308719"
              target="_blank"
              rel="noreferrer"
            >
              Jadwalkan Konsultasi
            </a>
            <a className="button button--outline" href="#approach">
              Lihat Jasa
            </a>
          </div>
        </div>

        <div className="cta__mark" aria-hidden="true" data-home-reveal="scale">
          <div className="cta__cubeBox">
            <img
              src="/assets/craftivation-cube.webp"
              alt="Craftivation Cube 3D"
              className="cta__cubeImg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
