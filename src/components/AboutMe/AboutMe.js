import React from 'react';

import './AboutMe.css';

import authorPhotoSrc from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__section-heading section-heading">Студент</h2>

      <div className="about-me__info-block">
        <h3 className="about-me__name">Сергей</h3>
        <h3 className="about-me__occupation">Фронтенд-разработчик, 26 лет</h3>

        <p className="about-me__biography">
          Я&nbsp;родился и&nbsp;живу в&nbsp;Иркутске, закончил юридический
          факультет РГУП. Я&nbsp; всей душой люблю спорт, музыку, а&nbsp;ещё
          люблю читать научпоп. Кодить начал в 2021 году по видеурокам на
          YouTube. С 2018 по 2021 работал в&nbsp;сфере продаж. После того, как
          решил пройти курс по&nbsp;веб-разработке, уволился с работы, чтобы
          полностью посвятить себя обучению.
        </p>

        <a
          href="https://github.com/8Gato8"
          className="about-me__link"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
      </div>

      <img
        src={authorPhotoSrc}
        alt="фотография автора проекта"
        className="about-me__photo"
      />
    </section>
  );
}

export default AboutMe;
