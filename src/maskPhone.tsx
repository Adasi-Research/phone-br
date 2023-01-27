import React, { HTMLInputTypeAttribute } from "react";
import PropTypes from "prop-types";

interface IpropsTelefoneBrasileiroInput {
  temDDD: boolean;
  separaDDD: boolean;
  separaNono: boolean;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

interface IapplyMask {
  value: string;
  mask: string;
}

const TelefoneBrasileiroInput = (props: IpropsTelefoneBrasileiroInput) => {
  const TYPES = {
    OITO: "9999-9999",
    NOVE: "99999-9999",
    SNOVE: "9 9999-9999",

    DDDOITO: "(99)9999-9999",
    DDDNOVE: "(99)99999-9999",
    DDDSNOVE: "(99)9 9999-9999",

    SDDDOITO: "(99) 9999-9999",
    SDDDNOVE: "(99) 99999-9999",
    SDDDSNOVE: "(99) 9 9999-9999",
  };

  //   Logica funcioanl das maskaras, são separadas por 3 (TEMDDD, SEPARADDD e SEPARANONO)

  const MAX_LENGTH = props.temDDD
    ? props.separaDDD
      ? props.separaNono
        ? clear(TYPES.SDDDSNOVE).length
        : clear(TYPES.SDDDNOVE).length
      : props.separaNono
      ? clear(TYPES.DDDSNOVE).length
      : clear(TYPES.DDDNOVE).length
    : props.separaNono
    ? clear(TYPES.SNOVE).length
    : clear(TYPES.NOVE).length;
  const { onChange } = props;

  console.log(onChange);

  let value = clear(props.value);

  if (value) {
    value = applyMask({ value, mask: TYPES[getMask(value)] });
  }

  function onLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = clear(event.target.value);
    const mask = getMask(value);

    let nextLength = value.length;

    if (nextLength > MAX_LENGTH) return;

    value = applyMask({ value, mask: TYPES[mask] });

    event.target.value = value;

    onChange(event);
  }

  function getMask(value: string) {
    if (props.temDDD) {
      if (props.separaDDD) {
        if (props.separaNono) {
          return value.length > 10 ? "SDDDSNOVE" : "SDDDOITO";
        } else {
          return value.length > 10 ? "SDDDNOVE" : "SDDDOITO";
        }
      } else {
        if (props.separaNono) {
          return value.length > 10 ? "DDDSNOVE" : "DDDOITO";
        } else {
          return value.length > 10 ? "DDDNOVE" : "DDDOITO";
        }
      }
    } else {
      if (props.separaNono) {
        return value.length > 8 ? "SNOVE" : "OITO";
      } else {
        return value.length > 8 ? "NOVE" : "OITO";
      }
    }
  }

  function applyMask({ value, mask }: IapplyMask) {
    let result = "";

    let inc = 0;

    Array.from(value).forEach((letter, index) => {
      while (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }

      result += letter;
    });

    return result;
  }

  function clear(value: string) {
    return value && value.replace(/[^0-9]/g, "");
  }

  return <input {...props} value={value} onChange={(e) => onLocalChange(e)} />;
};

TelefoneBrasileiroInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TelefoneBrasileiroInput.defaultProps = {
  temDDD: false,
  separaNono: false,
  separaDDD: false,
  value: "",
  onChange: () => {},
};

export default TelefoneBrasileiroInput;
