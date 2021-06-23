import Archetype from '../models/archetype.model';
import fs from 'fs';
import fsExtra from 'fs-extra';
import {
  request
} from 'http';

exports.postArchetype = (req, res) => {
  fsExtra.emptyDir('uploads', (err) => {
    if (err) {
      console.error(err);
    }
  });

  const archetype = new Archetype({
    type: req.body.type,
    label: req.body.label,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    }
  });

  archetype.save((err, archetype) => {
    if (err) {
      res.status(500).send('Something went wrong.');
    } else {
      res.status(200).send({
        message: `${archetype.label} ${archetype.type} was created.`
      });
    }
  });
};

exports.getArchetypeGroupByType = (req, res) => {
  Archetype.aggregate([{
    $group: {
      _id: {
        type: '$type'
      }
    }
  }], (err, archetype) => {
    res.send(archetype);
  });
};

exports.getArchetypeByType = (req, res) => {
  Archetype.find({
    type: req.params.type
  }, (err, data) => {
    if (err) {
      res.status(500).send('Error fetching archetype type.');
    } else {
      res.status(200).send(data);
    }
  });
};

exports.deleteArchetype = (req, res) => {
  Archetype.deleteOne({
    _id: req.params.id
  }, (err, data) => {
    res.status(200).send(data);
  });
};