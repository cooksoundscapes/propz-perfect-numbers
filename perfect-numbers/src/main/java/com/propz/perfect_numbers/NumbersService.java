package com.propz.perfect_numbers;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class NumbersService {

    private final Set<Long> mersennePrimes = new HashSet<>();

    public boolean isPerfectNumber(Long targetNumber) {
        if (targetNumber <= 1) {
            return false;
        }

        long sum = 0;

        // goes up until sqrt(target)
        for (int i = 1; i <= Math.sqrt(targetNumber); i++) {
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

    /**
     * @deprecated
     * Very poor performance-wise!
     */
    public List<Long> findPerfectNumbersInRangeOld(Long from, Long to) {
        ArrayList<Long> result = new ArrayList<>();

        for (Long n = from; n <= to; n++) {
            if (isPerfectNumber(n)) {
                result.add(n);
            }
        }
        return result;
    }

    /**
     * Optimized algorithm making usage of Mersenne Primes check:
     * a perfect number must be an even number that can be expressed in the form of:
     * pow(2, p-1) * (pow(2, p) - 1)
     * where p is a Mersenne Prime.
     * It's also caching Mersenne Primes;
     * @param from start of range
     * @param to end of range
     * @return List of perfect numbers
     */
    public List<Long> findPerfectNumbersInRange(long from, long to) {
        List<Long> allPerfectNumbers = generatePerfectNumbers(to);
        List<Long> result = new ArrayList<>();
        for (var n : allPerfectNumbers) {
            if (n >= from && n <= to) {
                result.add(n);
            }
        }
        return result;
    }

    private boolean isPrime(Long n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        if (mersennePrimes.contains(n)) return true;
        for (long i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        mersennePrimes.add(n);
        return true;
    }

    private List<Long> generatePerfectNumbers(long limit) {
        ArrayList<Long> perfectNumbers = new ArrayList<>();
        long p = 2;
        while (true) {
            long mersenneNumber = (long)(Math.pow(2, p) - 1);
            if (isPrime(mersenneNumber)) {
                long perfectNumber = (long)Math.pow(2, p-1) * mersenneNumber;
                if (perfectNumber > limit) {
                    break;
                }
                perfectNumbers.add(perfectNumber);
            }
            p++;
        }
        return perfectNumbers;
    }

}