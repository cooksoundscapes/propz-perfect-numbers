package com.propz.perfect_numbers;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NumbersService {

    public boolean isPerfectNumber(Long targetNumber) {
        if (targetNumber <= 1) {
            return false;
        }

        long sum = 0;

        // vai de 1 até sqrt(target) - nenhum número > que a raiz será válido
        for (int i = 1; i <= Math.sqrt(targetNumber); i++) {
            // se for um divisor inteiro
            if (targetNumber % i == 0) {
                if (i != targetNumber) {
                    sum += i;
                }
                if (i != 1 && i != targetNumber && targetNumber/i != targetNumber) {
                    sum += targetNumber / i;
                }
            }
        }
        return targetNumber == sum;
    }

    public List<Long> findPerfectNumbersInRange(Long from, Long to) {
        ArrayList<Long> result = new ArrayList<>();

        for (Long n = from; n <= to; n++) {
            if (isPerfectNumber(n)) {
                result.add(n);
            }
        }
        return result;
    }
}