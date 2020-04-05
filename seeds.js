var mongoose=require('mongoose');
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pacific_war");

var   Blog      =    require("./models/blogs"),
      Comment   =    require("./models/comments");

var data=[
      {
        name:"Attack on Pearl Harbor",
        image:"https://image.shutterstock.com/image-photo/japanese-photograph-taken-during-attack-260nw-249573145.jpg",
        description:"The attack on Pearl Harbor was a surprise, preemptive military strike by the Imperial Japanese Navy Air Service upon the United States (a neutral country at the time) against the naval base at Pearl Harbor in Honolulu, Territory of Hawaii, just before 08:00, on Sunday morning, December 7, 1941."
      },
      
      {
        name:"Battle of Midway",
        image:"https://image.shutterstock.com/image-photo/battle-midway-june-46-1942-260nw-249572902.jpg",
        description:"The Battle of Midway was a decisive naval battle in the Pacific Theater of World War II that took place on 4–7 June 1942, six months after Japan's attack on Pearl Harbor and one month after the Battle of the Coral Sea."
      },
      
      {
          name:"Battle of Iwo Jima",
          image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBIVFRUVFRUVFRUWFRUVFRUWFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMABBwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAYFBwj/xAA8EAACAQIEBQIDBwMDAgcAAAABAgMAEQQSITEFBhNBUSJhMnGBBxQjQpGxwVJyoTNi0ZLwFUNTY4LC4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD03GfH9B/NQkVZxo9X0H81DagjIobVJTUAWpWo6VAIWny0a0VqCMLUq0gtEBQKipAU4WgVKntSIoGpiKKhNAxpjT0xoGpjStStQMaaiIpqBMajcVJalagiVBQtH7VOFp8tBVKVKlGyVGyGgr4s32Otc+SxBuPnV84O5zGiaC3ag4Sw5TpV5ToKsthQdbW/mpVwl6CThI9f/wAT/FPUnDYSr/Q/xTUFvFj1fQfzUNWMWPV9BUBFANMRRGmNAJpqe1KgcUdAKMGgzXE+Ly4FmLI00UrFoyW1RjqYjpoN8v6eKfhfP+ClIVnMLE2yyCwB92FwPrau7xDApNG0UgurCx/gg9iN715hxzlVnLxiwxES5hpYYmLYOP8AeNj7/Og9bhdWGZGDA7FSCD9RUlq+b4p5YSWiMkRSyvZirBibHaxGtaDhP2hYyFXDyNKSoEZcqQjX+I3W7aaWvQe4EUrV59yz9paSAjG5Ua6hemshzX3OUXtb5/StSnNuAKhxiorE2AzWa/8AbuP0oOuRQkVFhuIwyHLHLG5tfKrqWt5sDe1WGFBERTWozQ0DWpUqagc0NqelQIilTZqYmgKnoAacGgO1NanBp6CN0pulRFqfNQB0xTEUd6BjQFg29dvY/wAUqj4ffq7flOvnUUqCzinGe2twAdjbW/fYnTaozU2L+L6CoaAaaitTUDUNEaY0DXohQ0QNAYrmcc4aZVDRnLNGc0T+G7q3lGGhFdMU9qDyzmvg64qP77DHlmjbLiIe+Zd1IG58HuCPavP5BlAcFbNe6DUqAe4O3tXunHMG0T/fIlLWGXERD/zYh+YD+tNSPIuKzHMXCMLBH/4hDF1A9muuos2zC+ijzYbmg85wnDJJD6FKqTozaafz9K6HCeNScPkdVEUmYWcEBrjxm3Xfao5MZisUcsSEDwuw/uc1dg5bigXqYyQeyA6X/dj7CgHl3mJcPLJiZIVeRltGASoQ33B1I008/rXsPL/MUeIwyYiQrEWDXDMAPQbMwJ/L718+4uVWclBZb6D2960/J3Nn3Rz1VaRCmQKGtlF76KdKD2+GZZFDxsGVhcMpBBHkEb0dqp8DxqzwRzICqutwDuO1v8VdNBGaa1GaAigEmhLUTVERQFekTQWp7UD5qcNUdNegshqe9Qg0+agMmhzUJpBaAg1ETUT6VWafXeg6ODPr+h/ilVfhkt5Lex/ilQXcWPV9BUNTYr4voKioGJpiKKmNAJoSKO1CaAaICmoloHogaaiWgY1ncREuGco6g4SckEEaQyudb/8AtuT9D860lqhxeGWRGjcBlYFWB2INB5bzviZME6wwRhVYXRrab2KqNrjT9RWah4FiJ/xcQxUeXN2t7DsPnavU4m6TfdMSA5QF8PK1rvGBYi//AKijQ+V1rC4PhuM4pKwH4UKtZt8q/wC0D87f4+VAXKnL0E+JWNBnSL1ysdQx/KhO1vYaaUuZuSJMNMZIo2kw5Oaygs0Y7qwGpXww7b+/p/L/AAKHBxiKEe7MfiY+Sa6dBS5fRVw0IQZV6aEDUWBF9jr3q/Q3pXoEaVqEmmLUCIqNqO9Naghpi1E4qu5oJb09QB6NZKCcUrVF1aJZKCZVoZXtQ56ila9Axe+5qEpUqrRlKCTha2k+h/ilUnDx6/of4p6Cxivi+gqOpMUPV9BUdA1qRp7UqAbULCjpjQBRAU1EtA4FEBSFEBQNalajtT2oOXxvhS4iPITlYENG43jcfCw/47i9VeWcWChw7gLNDpIgXIBfUMo7qfPf2rvWricc4c2ZcXhx+PEDpt1Yz8UTfPcHsaDr01Q8OxqTxrLGdG7HQqRoysOxB0tVm1BGRQVKaEigCmoqFhQCTThqa1NQSWvTdIVGr0Rc0CaIeKgmW1SO9RnWgq5qMMKJ0tUbLQEJLUi9MiU6mgmhUmp+kKjRxYaW9u49tKkSgsYOOzfQ0qLCn1fQ/wAUqAsSPV9BUdqlxHxfpUdArUxFFTUA0JozQmgG1EFpqdTQEtGKGiFAV6cUNqICgemtTinoM7j1ODlOKQHoSEfeFH5DsMQo/wAN7a9jXeUggEG4IuCNiDsRROgIIIuDoQdiD2rg8Pf7pKuFc/gyE/dnP5DuYCf8r7adqDtkUJFSlaEigiNCalIqMrQRmlapMtNagjK0JqUio2oImqMmpWFAaATUbVIKEigjXeiNEoFFagrB2v8A9/tVlJKjMetGFoLvD3u1vY/xSoeHD1/Q/uKegtYj4v0oKkn+L9KAUDUqekaATTGnNNQNanApU4oHohQ0YoHFFSFFagEU9qcCmzjyP1oObzDJJ0WSEXlkBVBoLX0LXO1gd/JFV8LwEHCDCzsXJGri4KtupS+xXSx9qmg4gry2awIzZdddDa23jX2qo/HJWxv3ZI8sUadSWVu4I0yjsN9dyR4GoWeBY2Q5sPiP9aKwLWssqn4JF9yBqOxBrqkV59xviAwzPjEbKzMGytZjJ6kXKBfSy6abDX57jhXEEnjEiaXtmU7qSAbH6EfrQTsKDLUzCgtQBamIqS1CRQRlaBhUpFAVoIStAVqUim6dBCVoCtWGjNRlKAAtEFp8tGFoByUstSBaMJQLArZvof4pVPhhr9KVAU/xVHRzfEaCgcUqQpUCNDRUrUA2pwKIikBQICiApgKMUCAo7UwoqDPc88Qkw+EaWLcMgY+FLWP8D61mOMcUkGCu1mdkBdfVdgxUAC1jf1dje/8Anr/aVj5YIEMTACR+m4YXFirMCPf0/wCa88x2NmwxgnuHyOSM2oJUZgD+gIoLfA8fjMPixhmv1VupQnSzhZCAT+pP6dq0fNXMAEJKMv5RKo3JU6ISNSlwwNvN77g+VvxKWSfru7GQtcsSb37a+NhXSl4fLJKIc6IjkZpZGVUAOZr5jqRoxsKCxj+YRM7HKTEkZjhVstx6o2BcgeoDJe30JIJq7wfjcmHWJMMW1jXrFWJDszkoLH4WCWS+u3tVThnL2HmxEsK4q8af6ThdZTlBY2Oygk/4+dNiOU5VJMBMtgSHVWS1hf8ANa/axB+lB6DydzQXdYHDBm7G50Oa1vHbf+a3ZFeKckcQ6cwXGGTIWGUGR0KS3DKXUEFla1rG42817bQDamIo7UrUERWhK1MRQkUFZxQq1SyLUZU0Dl6BjenIpA0AKtOFqVTT6UEYFSKafKKVqCWLelTRDWlQDP8AEfpQ0U3xH6UFA4p6YU9AqVKlQImnFNTigMU4oRRCgIUVAK5/G+OwYRA+IfLfRVALOx8Ko3oM/wA/4P7w0MOayoWkfub2AT/715jznxTbCqMoikLA2sT6FAN9yb59fcV6bLBJOTOXyA+rKFXOFIuoYsdNLV5NzFE6Yx3mV2VHF2tup1QEggAmxG4+E+KDh3tZvcePntWr4nGJTD02yrN0YCwGbVlHpK32DE/86VYxPFcDPg5IyypLlLqpiEbZxqtmX0nx3OtZybHBIYVTMHDrMT+Ulc2Q/MXHt+5DvcwcLPD8ScNFMxCRCUyWCsC+jarqBZRpfuPNdTh3M8cccUmSTUtd5GzkkZgCCe5Nv7b2He+J4zxH71iJsS/pMjs+UakD8q3PgAD6UE00nSRc14rkqBb0tpmB7g7b79qD1PAc14PH2jxUPqtbLmtfNYEBri9r7b6Vq+C414WOGlzPGtuhiNw6kgBHI2ZbgXO+/mvHOCcl43ExDEQRqUJIBMiKTlNjYE+b7+K3PJ+A4nhG6UsDPG4up6iMsbDuSGuAQNvlQemVTbikWpV1YDQkEEAg2IvXmvM/PMzo2BhV+sztG5CFHUBrCNFDMSx832Pvpa4PyK0OGZsXI2d7AQq9kQsRqSPia19tNxrvQbGLj6sxFrKDbNZiG/tIFu4rl82cwSxGMRgRxNcvO1yqn8q+m5A01+e4rqQRBVAA2AHt+mwqGTBwuSGCl9DcE5rdr33Gh0NwaCXgnFFmLIGzZQCG+g0ve53rqlaz3LHBXw80xDjoMB0oyDmiJN3VT/RoLD9ra6O9BGVprVIaEmgYUiKQp6AQKKmpUBx70qaLelQBM3qP0/ahziquOms7DTt+wqt979qDqBhT5q5gxdEMTQdG9K9c1p6AT0HVp71yxPUgxHvQdIUQrnjE+5o1xVBerx7mTi8UuJxEuIRWWOZYoiC3UXp6gCxtkJBzaX9ZtqBXpHG+MdDDyzf0ISPmdF/yRXgEh6gBVz1CZGYEG3pDyZs1visNvce9g1XCuHGSRljhdH3aWRmQnwPOnjyNiBpwuP8AD5cJiCmIIYMQ4NyVdA2gawF7WW4tpbTtS5S5m+7TF5czK5u9tWJ8+9bvjQg4tAy4V/xI7tGWVlz+k54wDZgCCNbWuBvagyvEOCwYnDjEYZBHIFsY0OcORrfypPy8Vm+LYSfDTCLEL64whCtZlykBlFtrWIuPnT8CSYyAwtZh6iMwBIGp9N9RpXd5/WSRocUVsHgWN7ai8TkXJtsQ0dqDivIcQQkMSqbZmCEgbC5yk2AF+1AmDfphsgtdvX3NiwOvi4+WnvVCPEEWvqBewue/b2q6zGSO+csVsAhJJRQCWyA6ZSTf6UH0ByHwyXDYKOGcIHBckIbizMSLnYmx7Voa8X5E57xSSph5m6sNtcwJeNVW5IYa2FvzX08V7HhsQsiiRCGVhcEdwaDhc0cAMuXE4XKmLhOeN7D8TSxik8qw012/WsHxX7QMQ0nV+6gRoApQucyPs5uNje422ArafaLzH9zwp6ZtNLdI/K6eqT6X09yK8S4fxlo1ZTqGH/d/I3oN1wnn9XcIxaK50LBWU+xO4v52ouOS4mU9XCyKHw8Ts0iE5pFe+WARksXa8fn3074rh2OhGbqIHzELkPYHchjovzq6vHThgYo5XPqaxZi2UaFVF+1Bv/ss+9XmOKL7AgSZ7gkj4b6W0N7e1eg14Zy9zZKJUlllMcSyJnfLe639Q030GwBOteg8O+0fBzSKmWVFdsiSOoyl7gBSFJK7rqR3G1BsKE0baa+KocL4rBioxLh5BIvtoVPhlOqn2IoLYp70rUEmb8oH1JH7CgO9MTVSWWZdekrjwj2b6K4AP/UKfCY6OW4Q+pfiRgVdfGZDqBpodj2oLcR1pU0Q1pUFHG/G2nj9hVYqvipMfMBIwuBt48Cq/UH9VAeRfFCzIPyn9K5s/FVEwgUnMFzMAt7g7AHYfWqUvE2ac4dmMfpVkta7XuTdiLflPpGttb0HXh4lE5dFuDGcraW11/XY0RynZjWWwWKw8eKldJEtKFBYG4D+kBTvqSTof6h7VolJJsbD9j8vf23+dBYH91EoaomQ2030qeD50B2Pg04NKScBGdfVlDekbkre6j30qHBcSEmZbHMhs6kXynUWBtZhodf2oLDoHUqwBDAgg7EHcVlOZ+G4PAcPxJijSMyxmIfmZ2e6qLsSTbMx9hetcjr4/cV5d9qOKbEYpcNHmZMOgeQA7M5F/rlKgf3GgynJ+DMmJR8iskP4smdskdk1UOxBABaw2Ol/BrYcv45QzELBGysCxhUdPKNryoMpP9x+Q1rhrxLDSq2EVJIYd06UiLmsNWnMljIwNzYkeBXLGCljylCzLYvH02cZwLhnjBBF/b9KC10kim1xCFXd2OkiqjAsQM6WYdhmsRre2ldHmjjMMmCENwZOorKVOZWtfPYlENh5yjXzrXL5Y4O3EsSYhKyqEMju9nYKpUHXQE+oa1BxOGFpHeFbYeLNFGSfVIUA/Ec98zPfTsRtagq8tcLOKxUOHANncBrdkHqc+3pBrR838qS8Ol6sWZsOx9L2vkv+ST+CdD867v2M4Eu8uKc6RqIo+wBf1OR8gF/6q1vO/HoYoJFkCuCpHTJH4l9MpHceaDE8uZFw+LxUMaZkgYX9JBMpFxYHQZVPp31963H2Z8bOKwpL2zRvkNrAfCCCANhb9jWMjxPQ4Qst7NNMbhTluLyHJqpuLaW8d6t8p4FsNw+RhP0jLrIbraPKLBTfY2IJ1G/1oMrz/wAYfFYuRzcIpMcQ7ZEYi/zJuT87dqfk/lbrus+KPTwwNySQpmIPwRk7i41I2+e3WwHKnXd5JHBwsKEyToAM2RblI9TnIA1I0G3a1eqfd8MsCxFFEKRL6XtlVABlDXO+n+KDyrjvBOHQYoSX6mGlUnpQyqJYXG9gTYoddCRbbwDwuOYWCd8nDsPIqRRs8wfN1RZrFpHckKuWx7AXN/aGSYTT3KyS52IaOP0kkmwsQxubWJ3FydTvWs4tOeHwqOi6xOdVzr+JKVuVmKk30B3P00oMlzPhpC/VARUmJkCRsWCBQNXsAFvmY9jq3axpuDqUW7xyxtlZo5UR3clSNLKQQLE+q+lRYnjKyWUwxKncKCDb+7zqaqZppZFjw/Vcm4VRqb7mwXtYa/Kg03Aee8VA0cTyPl6nrMxZvQ9gGYn1gLqdDtfersfW4Xjuo5cRzHMjQkOkyt6msDowBOxsRe498RxEzgCGe69MkBG3GmoH6g+9dLAca/ATCYgHIrl4pbZuiw1BAGrpckMo7MbWIFB7JhOb45YWnVwAl8ysLEG1wpAza/KsHxz7SJupmw0zZRb0lECnyCCuYj61meK4aeKBZzIqrIzKY1a9/UdV7Mv6W2tvXIweOjjdXMSygfEkmYIT7FWB/X/NBtMJztxTEZuniEDC1kWNMxv2F1Pvud6vnmLHTxq3TQsCojxHwSxSvY9IkHKA50XMAjXUanSsnx/mySe0cF4Ybf6SWUA9xddxUPCJrgxgkSEFWRick6nXIf6WvqD5FB7dyjzSuKCxSI8eICnqxsjLYoQGNyNjcED39qVYf7KcVKMYMNMcxSByM2bqxi8REZvb0+rQa2INtDqqDacdxkcUsjSMFAy3J21AAFzpqdPmRWe4vzKIx6Y2GuUqxyuT3yx2zEfLalzph5JJ5ocUw+7yvGICPSUkyqFViN1LBiQ19xasbxrgOJDOEd8skwuhKh2tGtyig2bKL7bqAe1B3OXcXCkmeSVh1y7G0a9S6sFKswzZRqoAH+KvYvgweTP11aGQyQtHdjIrhc8dmOnUsGOpUai29ZjjfEIZI5OlHbpTwxw5VsMkYyAIb3N2Mh//AGrGH48kGZZISTiQshW2bMjEhSwbKt7AgWN/NBo8DwLLIUZSYbBFbKoJaxLkgbLYRgdyR8jXYxJlDOEszMI2VGtYqrBZAAb20sb/AO6q0fFCi9KZo1BGaOzZjYsL5rqCwBYi6jQISfYuX40xiw45gIp7Swvlvkb1HQqTopKhh41FB2lJDKoBZWNr31SwJBJ7qSLebmubjuLyrM8XQIYZGgzZss3aVWKg5ct7/Udzaq/MXF5YGTB4VfVlGaV2Kg2Isiv3c6aeD7is9x7BhkgjxbtKwf1rEXKoXsXka5zEZjcDONCDtpQPBxaXrdHG4h4XkJ6KoQIlctdg4Azgag66a1r8JirzyBXMivEHjK2dA0ZKyqcp0e7q1rXNz4rzzHScQLlcNC7QR3Cq+aRdMwzBnClSRuq2XtY96OI4w0UauqhcYLL1FJSeFkIW06AZZFb1WvoQw9N11DYYj7QoY1VRG7SWAdSSpRzujaG5HkCs1h8LLFL9/klhldn6ksaOWzwyq2YA2sNA4ym/wix0IOv4HxxpU+9YvBMjRqepMEMRUKdGZJQA1l9VwfIA7GhwnigxAd53jlWV5WRDGpeOOMIitJGt2/ERgTYW9Pa9Bn+L4rh5zYjBZ2lADiMggIVWzPJmGVgLBrA3Jv8ATk8F4kWSLDvJ0um+aGYDqNGWIDKUF8ynuP8Ak31+O5IixBIwpSMsgZ00ysFcMCjbrm1Fwv5Tf3x+M5ZMU0kMrNEAA0cjocoDH09XLe2ml1JsRQa3EyIkeLwydKDHYiMfiKSsWIQEl+nf/SdlzXXyb3O9Zbj8nVbJACYwrPlyBHUoitIXXfMLPf620FUhgSWBjc4nRgQoYE22AJzE7307eK0/D+ZymFkWxGIYK4klKuZypIZc4XU9P0ZTr6r6jSg6nJPECuHbD4cqWRTIYyxPW2zsptdTYWKEAgqOxNZvmiWLESRDDrrL6izSE2GoytmNlAsxN7EW1tYinwPMiJJmxmEUyBtJImOGkDDtKqWVt97CoSsOIWWaPDzK6KrSMpiMWbMSHcMLi53ynXe1BtsiSRx4WRjNJC5mDrGegx6VzCpA0y51sN9O1VOXePlsTOyI4XpHPHlvqsiIjOLHKQC/0sOwrLjmaWNEENkRbmS7sJJnJJLtlIOtzYd+9xWy4fwYw4QoBIZcSwMxCm69gmZj6gNbt3JJ2oNFgpi0bKz/AITxt3IAQj1ajW2/ivO+ajiZf9GQyQyNlVLN1AY1uQ/pGunmxruPxUxBcNECARmmeQlJM41HTzKRkAUnX4jsdRfHSY2TNPozdYeiQ7X9OcjsQQ3zF121oOxyjJhsNG7tiIVxF8pEglXp7+kgpcm47dxreu4cdgp8M2HxOPw5DZSSWscwNzlDZbG+xHjavLcVE9802a7m+Y6lvLa/FvWp4PLEqB4oVjXVDLMjShyAGLsxGVF0tpsSPegnbhmEjlaKKONlChpJ5rzJGjn0qACAjG4s176jWtPyrwWKGAS4klYjKJIQQ8YBbQaMbqDpppsN9zxIOelDLEscZiVgxOxNtWcg3zEan3tpVrF8+mYKRh+rGRldSSEJP+0jYE27b0HS5z4NgZEfGMkbBAM5SXphzoAoe+XOQbAd9Na85fiKiSI4LDnJGzN0WUyy3KhXLHU5SAu1gDXV5/4kZtVhmjVbJJHKSYonW2RoReyllLA+1vNd/wCzfhcmGhGIYX+85TYWzqoJyhr9iCW07Ggh4bh8HxDDlI4wJF16HWysr/mKq4NgdNRcaagVUT7Mi4zq8keg9DIrENY31zAFdrWJ3qHn3lqHDI2LhkRX6uYIhKkKbLZVBNmB1NrDU1Jw7jvFsKLN051XKXRnRnUEA2LXBvbvrrQZjinL/wB3LCQyHKcuYxlFDbg3JOYWvoLbjWufiG0W0mewsNGDKBsDfTzsTW44x9oGHmBy4dnzqwZZNVGnpGW9ib97bVzeX8AHVHYwJGgzN1ZAJTpoQIhnCDTfx4oO19kHFGlxgjl9bLBIVkJuQuaO6e4vY0q1PJy4FJ1CPE+KaJmBiVwvSJW+p0OuXwfbSlQf/9k=",
          description:"The Battle of Iwo Jima (19 February – 26 March 1945) was a major battle in which the United States Marine Corps and Navy landed on and eventually captured the island of Iwo Jima from the Imperial Japanese Army (IJA) during World War II."
      }
    ];
    
    function seedDB(){
        Blog.deleteMany({},function(err){
           if(err){
               console.log(err);
           }else {
               console.log("removed blogs");
           }
           
           Comment.deleteMany({},function(err){
               if(err){
                   console.log(err);
               }else {
                   console.log("removed comments");
               }
               /*data.forEach(function(seed){
                   Blog.create(seed,function(err,blog){
                       if(err){
                           console.log(err);
                       }else {
                           console.log("added a blog");
                          
                       }
                       
                       Comment.create({
                           author:"Tom",
                           text:"I could learn a lot from this blog!"
                       },function(err,comment){
                           if(err){console.log(err);}
                           else {
                           blog.comments.push(comment);
                           blog.save();
                           console.log("created a new comment");
                           }
                       });
                       
                   });
               });*/
           })
        });
    }

module.exports=seedDB;
